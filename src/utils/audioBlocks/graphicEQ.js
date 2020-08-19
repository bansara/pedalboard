import { constructEqBands, createEq, createIO } from './modules'

class GraphicEQ {
  constructor(context) {
    this.context = context
    createIO(this.context, this)
    constructEqBands(this, [
      createEq(this.context, 'lowshelf', 62.5, 1),
      createEq(this.context, 'peaking', 125, 1),
      createEq(this.context, 'peaking', 250, 1),
      createEq(this.context, 'peaking', 500, 1),
      createEq(this.context, 'peaking', 1000, 1),
      createEq(this.context, 'peaking', 2000, 1),
      createEq(this.context, 'peaking', 4000, 1),
      createEq(this.context, 'highshelf', 8000, 1),
    ])
    this.input.connect(this.band62)
    this.band8000.connect(this.output)
  }
  setValue = (band, param, level) => {
    this[band][param].setValueAtTime(level, this.context.currentTime)
  }
}

export default GraphicEQ