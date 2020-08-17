import { createAnalyser, createGain } from './audioBlocks/modules'
import newContext from './audioCtx'
import Reverb from './audioBlocks/reverb'
import Delay from './audioBlocks/delay'

const setup = () => {

  const context = newContext();
  context.latencyHint = 'interactive'
  const masterVol = createGain(context, 0.5)
  masterVol.connect(context.destination)

  const analyser = createAnalyser(context)
  const inputGain = createGain(context, 1)

  // Create Effects
  const reverb = new Reverb(context)
  const delay = new Delay(context, 0.2)

  // Wire them up
  inputGain.connect(delay.input)
  delay.output.connect(reverb.input)
  reverb.output.connect(masterVol)

  // Bypass effects so initial state is dry only
  // Power button connects/disconnects same nodes
  delay.input.disconnect(delay.filter)
  reverb.input.disconnect(reverb.wet)



  const signal = {
    ctx: context,
    input: {
      analyser,
      inputGain
    },
    effects: [delay, reverb],
    output: {
      masterVol
    },
  }
  return signal
}


export default setup