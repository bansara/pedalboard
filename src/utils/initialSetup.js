import { createAnalyser, createGain } from './audioBlocks/modules'
// import Musikvereinsaal from './audioBlocks/IMReverbs/Musikvereinsaal.wav'
import newContext from './audioCtx'
import Reverb from './audioBlocks/reverb';

const setup = () => {

  const context = newContext();
  context.latencyHint = 'interactive'
  const masterVol = createGain(context, 0.5)
  masterVol.connect(context.destination)

  const analyser = createAnalyser(context)
  const inputGain = createGain(context, 1)

  // TODO - MAKE AN APP
  // THIS IS HARD CODED
  const reverb = new Reverb(context)
  inputGain.connect(reverb.input)
  reverb.output.connect(masterVol)

  const signal = {
    ctx: context,
    input: {
      analyser,
      inputGain
    },
    effects: [reverb],
    output: {
      masterVol
    },
  }
  return signal
}


export default setup