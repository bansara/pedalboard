import { createIO } from './modules'

class Preamp {
  constructor(context) {
    this.context = context
    createIO(this.context, this)
    this.drive = this.context.createWaveShaper()
    this.drive.curve = this.pulseCurve()
    this.drive.oversample = '8x'
    this.compression = this.context.createWaveShaper()
    this.compression.curve = this.makeCurve()

    this.input.gain.value = 1
    this.output.gain.value = 1
    this.input.connect(this.compression)
    this.drive.connect(this.output)
    this.compression.connect(this.drive)
  }
  makeCurve() {
    let curve = new Float32Array(44100),
      x
    for (let i = 0; i < 44100; i++) {
      // x = i * 2 / samples - 1
      x = -1 + (2 * i) / 44100
      // tube-like compression algorithms
      curve[i] = 2 * x / 1 + x ** 4
      // curve[i] = x / 1 + x ** 64
      // curve[i] = 2 * Math.sin(x) / 1 + x ** 2
    }
    return curve
  }
  pulseCurve() {
    const curve = new Float32Array(44100)
    for (let i = 0; i < 44100; i++) {
      let x = -1 + (2 * i) / 44100
      // square wave works as fuzz
      // curve[i] = -1 + i / 256;
      // curve[i + 128] = 1 - i / 256;
      // soft clipping
      curve[i] = Math.tanh(x)
    }
    return curve
  }
}

export default Preamp