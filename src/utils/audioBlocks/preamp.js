import { createIO } from './modules'

class Preamp {
  constructor(context) {
    this.context = context
    createIO(this.context, this)

    this.compression = this.context.createWaveShaper()
    this.compression.curve = this.makeCurve()

    this.input.gain.value = 1
    this.output.gain.value = 1
    this.input.connect(this.compression)
    this.compression.connect(this.output)
  }
  makeCurve() {
    let i = 0,
      samples = 44100,
      curve = new Float32Array(samples),
      x
    for (; i < samples; i++) {
      // x = i * 2 / samples - 1
      x = -1 + (2 * i) / 44100
      curve[i] = 2 * x / 1 + x ** 4
      // curve[i] = x / 1 + x ** 64
      // curve[i] = 2*Math.sin(x) / 1 + x ** 2
    }
    return curve
  }
  // soft clipping algorithm
  // pulseCurve() {
  //   const curve = new Float32Array(44100)
  //   for (var i = 0; i < 44100; i++) {
  //     let x = -1 + (2 * i) / 44100
  //     // square wave works as fuzz
  //     // curve[i] = -1 + i / 256;
  //     // curve[i + 128] = 1 - i / 256;
  //     curve[i] = Math.tanh(x)
  //   }
  //   return curve
  // }
}

export default Preamp