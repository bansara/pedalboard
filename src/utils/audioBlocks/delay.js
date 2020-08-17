import { createIO, createGain, createEq } from './modules'

class Delay {
  constructor(context, time, feedback = 0.5) {
    createIO(context, this);
    this.feedback = createGain(context, feedback);
    this.delay = context.createDelay();
    this.delay.delayTime.value = time;
    this.dry = createGain(context);
    this.wet = createGain(context, 0.5);
    this.filter = createEq(context, 'lowpass', 2000);

    this.input.connect(this.dry);
    this.input.connect(this.filter);
    this.filter.connect(this.delay);
    this.delay.connect(this.feedback);
    this.feedback.connect(this.filter);
    this.delay.connect(this.wet);
    this.wet.connect(this.output);
    this.dry.connect(this.output);
  }
}

export default Delay