import { lfo } from './modules'
import Delay from './delay'


class Flanger extends Delay {
  constructor(context) {
    super(context, 0.004);
    this.context = context
    this.lfo = lfo(this.context, { frequency: 0.8, gain: 0.001 })
    this.lfo.osc.type = 'triangle'
    this.filter.frequency.value = 20000;
    this.lfo.output.connect(this.delay.delayTime);

    this.dry.gain.value = 1;
    this.wet.gain.value = 1;
    this.feedback.gain.value = 0.7;
    this.output.gain.value = 0.5;
  }
}

export default Flanger