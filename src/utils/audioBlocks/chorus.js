import { createIO, lfo } from './modules'

class Chorus {
  constructor(context) {
    this.context = context
    createIO(this.context, this)
    this.delay1 = this.context.createDelay()
    this.delay2 = this.context.createDelay()
    this.lfo = lfo(context, { frequency: 3, gain: 0.0005 })
    this.lfoDelay1 = this.context.createDelay()
    this.lfo2 = lfo(context, { frequency: 0.333, gain: 0.05 })
    this.lfo2Gain = this.context.createGain()

    this.input.gain.value = 0.5
    this.delay1.delayTime.value = 0.003
    this.delay2.delayTime.value = 0.007

    this.lfoDelay1.delayTime.value = this.lfo.osc.frequency.value / 3000

    this.input.connect(this.delay1)
    this.input.connect(this.delay2)
    this.input.connect(this.output)
    this.lfo2.output.connect(this.lfo.osc.frequency)
    this.lfo.output.connect(this.delay1.delayTime)
    this.lfo.output.connect(this.lfoDelay1)
    this.lfoDelay1.connect(this.delay2.delayTime)
    this.delay1.connect(this.output)
    this.delay2.connect(this.output)
  }
}

export default Chorus