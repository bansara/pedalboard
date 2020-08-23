import { createIO } from './modules'

class Preamp {
  constructor(context) {
    this.context = context
    createIO(this.context, this)
    this.drive = this.context.createWaveShaper()
    this.drive.curve = this.makeCurve()
    // this.drive.oversample = '2x'
    this.input.gain.value = 4
    this.output.gain.value = 0.25
    this.input.connect(this.drive)
    this.drive.connect(this.output)
  }
  makeCurve() {
    let i = 0,
      samples = 44100,
      curve = new Float32Array(samples),
      x
    for (; i < samples; i++) {
      x = i * 2 / samples - 1
      curve[i] = 2 * (x ** 2) / 1 + Math.abs(x)
    }
    return curve
  }
}

export default Preamp