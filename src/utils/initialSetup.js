import { createGain } from './audioBlocks/modules'
import newContext from './audioCtx'
import {
  Reverb,
  Delay,
  Overdrive,
  GraphicEQ,
  Chorus,
  Preamp
} from './audioBlocks'

const setup = () => {
  const context = newContext()

  const masterVol = createGain(context, 1)
  masterVol.connect(context.destination)

  // const analyser = createAnalyser(context)
  const inputGain = createGain(context, 1)

  // Create Effects
  const reverb = new Reverb(context)
  const delay = new Delay(context, 0.3)
  const overdrive = new Overdrive(context, 7.5)
  const graphicEQ = new GraphicEQ(context)
  const chorus = new Chorus(context)
  const preamp = new Preamp(context)
  // Wire them up
  inputGain.connect(preamp.input)
  preamp.output.connect(graphicEQ.input)
  graphicEQ.output.connect(overdrive.input)
  overdrive.output.connect(chorus.input)
  chorus.output.connect(delay.input)
  delay.output.connect(reverb.input)
  reverb.output.connect(masterVol)

  // Bypass effects so initial state is dry only
  // Power buttons connect/disconnect same nodes
  overdrive.input.disconnect(overdrive.distortion)
  overdrive.input.connect(overdrive.output)
  chorus.input.disconnect(chorus.delay1)
  chorus.input.disconnect(chorus.delay2)
  delay.input.disconnect(delay.filter)
  reverb.input.disconnect(reverb.wet)

  return {
    ctx: context,
    input: {
      inputGain,
    },
    effects: [graphicEQ, overdrive, chorus, delay, reverb],
    output: {
      masterVol
    },
  }
}


export default setup