import { createEq, createGain } from './modules'

class Overdrive {
  constructor(context, amount) {
    this.context = context
    this.input = this.context.createGain()
    this.distortion = createGain(this.context, 5)
    this.drive = this.context.createWaveShaper()
    this.output = this.context.createGain()
    this.amount = amount
    this.drive.curve = this.makeDistortionCurve(this.amount)
    this.drive.oversample = '4x'
    this.highCut = createEq(this.context, 'lowpass', 12000, 1)
    this.mid = createEq(this.context, 'peaking', 720)
    this.input.connect(this.distortion)
    this.distortion.connect(this.drive)
    this.drive.connect(this.mid)
    this.mid.connect(this.highCut)
    this.highCut.connect(this.output)
  }
  makeDistortionCurve(amount) {
    let k = typeof amount === 'number' ? amount : 2,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x;
    for (; i < n_samples; ++i) {
      x = i * 2 / n_samples - 1;
      curve[i] = (3 + k) * x * 30 * deg / (Math.PI + k * Math.abs(x));
    }
    return curve;
  };
}

export default Overdrive