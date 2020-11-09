import { createIO, lfo } from './modules'

class Chorus {
  constructor(context) {
    this.context = context
    createIO(this.context, this)
    this.wet = this.context.createGain()
    this.dry = this.context.createGain()
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

    if (window.webkitAudioContext) {
      // Safari and iOS
      this.dryWet = context.createChannelSplitter(2)
      this.inputSplit = context.createChannelSplitter(2)
      this.outputMerge = context.createChannelMerger()

      this.input.connect(this.dryWet)
      this.dryWet.connect(this.dry)
      this.dryWet.connect(this.wet)
      this.wet.connect(this.delay1, 0)
      this.wet.connect(this.delay2, 0)
      this.dry.connect(this.outputMerge, 0)
      this.delay1.connect(this.outputMerge, 0, 4)
      this.delay2.connect(this.outputMerge, 0, 4)
      this.outputMerge.connect(this.output)
    } else {
      this.input.connect(this.dry)
      this.input.connect(this.wet)
      this.wet.connect(this.delay1)
      this.wet.connect(this.delay2)
      this.dry.connect(this.output)
      this.delay1.connect(this.output)
      this.delay2.connect(this.output)
    }

    this.lfo2.output.connect(this.lfo.osc.frequency)
    this.lfo.output.connect(this.delay1.delayTime)
    this.lfo.output.connect(this.lfoDelay1)
    this.lfoDelay1.connect(this.delay2.delayTime)
  }
}

export default Chorus