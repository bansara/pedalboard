import { createIO, createGain, createEq } from './modules'
import stNicolaes from './IMReverbs/St Nicolaes Church.wav'

class Reverb {
  constructor(context, file = { name: 'St Nicolaes Church', path: stNicolaes }) {
    this.context = context
    this.fileName = file.name
    this.filePath = file.path

    // input and output
    createIO(this.context, this)

    // allows user to control dry and wet levels separately
    this.dry = createGain(this.context)
    this.wet = createGain(this.context, 0.5)
    this.input.connect(this.dry)
    this.input.connect(this.wet)
    this.dry.connect(this.output)

    // shape the tone of the decay
    this.lowCut = createEq(context, 'highpass', 100)
    this.highCut = createEq(context, 'lowpass', 5000)
    this.lowCut.connect(this.highCut)
    this.highCut.connect(this.output)

    this.createReverb()
  }
  createReverb = async () => {
    let convolver = this.context.createConvolver()

    // load impulse response from file
    let response = await fetch(this.filePath)
    let arraybuffer = await response.arrayBuffer()
    // convolver.buffer = await this.context.decodeAudioData(arraybuffer)
    this.context.decodeAudioData(arraybuffer, (buffer) => {
      convolver.buffer = buffer
    })
    // plug in the cables
    this.wet.connect(convolver)
    // reverb > eq > wet gain > output
    convolver.connect(this.lowCut)
  }
}

export default Reverb