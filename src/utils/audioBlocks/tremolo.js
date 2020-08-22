import { createIO, lfo } from './modules'

class Tremolo {
  constructor(context) {
    this.context = context
    createIO(context, this)
    this.lfo = lfo(context, { frequency: 3 })
    this.lfo.osc.type = 'triangle'
    this.lfo.output.gain.value = 0.5
    this.input.connect(this.output)
    this.lfo.output.connect(this.output.gain)
  }
}

export default Tremolo