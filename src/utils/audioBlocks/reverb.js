import { createIO, createGain } from './modules'
import Musikvereinsaal from './IMReverbs/Musikvereinsaal.wav'

class Reverb {
  constructor(context, file = { name: 'Musikvereinsaal', path: Musikvereinsaal }) {
    this.context = context
    this.fileName = file.name
    this.filePath = file.path

    // input and output
    createIO(this.context, this)

    // allows user to control dry and wet levels separately
    this.dry = createGain(this.context)
    this.wet = createGain(this.context)
    this.input.connect(this.dry)
    this.dry.connect(this.output)
    this.wet.connect(this.output)

    this.createReverb()
  }
  createReverb = async () => {
    let convolver = this.context.createConvolver()

    // load impulse response from file
    let response = await fetch(this.filePath)
    let arraybuffer = await response.arrayBuffer()
    convolver.buffer = await this.context.decodeAudioData(arraybuffer)

    // plug in the cables
    this.input.connect(convolver)
    convolver.connect(this.wet)
  }
}

export default Reverb