import { createIO } from './modules'

class Compressor {
  constructor(context) {
    this.context = context
    createIO(this.context, this, 3)
    this.compressor = this.context.createDynamicsCompressor()
    this.input.connect(this.compressor)
    this.compressor.connect(this.output)

    this.compressor.release.value = 1
    this.compressor.attack.value = 0.01
  }
}

export default Compressor