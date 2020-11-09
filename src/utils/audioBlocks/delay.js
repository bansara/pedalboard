import { createIO, createGain } from './modules'

class Delay {
  constructor(context, time, feedback = 0.3) {
    createIO(context, this)
    this.feedback = createGain(context, feedback)
    this.delay = context.createDelay()
    this.delay.delayTime.value = time
    this.dry = createGain(context)
    this.wet = createGain(context, 0.3)
    this.filter = context.createBiquadFilter()
    this.filter.type = 'lowpass'
    this.filter.frequency.value = 2000

    this.inputSplit = context.createChannelSplitter(2)
    this.outputMerge = context.createChannelMerger()

    this.input.connect(this.inputSplit)

    if (window.webkitAudioContext) {
      // iOS and Safari
      this.inputSplit.connect(this.dry, 0)
      this.inputSplit.connect(this.filter, 0)
    } else {
      // everything else
      this.inputSplit.connect(this.dry, 0)
      this.inputSplit.connect(this.filter, 1)
    }

    this.filter.connect(this.delay)
    this.delay.connect(this.feedback)
    this.feedback.connect(this.filter)
    this.delay.connect(this.wet)
    if (window.webkitAudioContext) {
      // iOS and Safari
      this.dry.connect(this.outputMerge, 0, 4)
      this.wet.connect(this.outputMerge, 0, 4)
    } else {
      // everything else
      this.dry.connect(this.outputMerge, 0, 2)
      this.wet.connect(this.outputMerge, 0, 2)
    }
    this.outputMerge.connect(this.output)
  }
}

export default Delay