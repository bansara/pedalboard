const graphicEQ = {
  band62: 0,
  band125: 0,
  band250: 0,
  band500: 0,
  band1000: 0,
  band2000: 0,
  band4000: 0,
  band8000: 0,
}
const overdrive = {
  gain: 5,
  midFreq: 720,
  midLevel: 0,
  tone: 12000
}
const chorus = {
  rate: 3,
  depth: 5,
  delay: 3
}
const delay = {
  time: 0.3,
  feedback: 0.3,
  filter: 2000,
  dry: 1,
  wet: 0.3
}
const reverb = {
  irIndex: 0,
  dry: 1,
  wet: 0.5,
  lowCut: 100,
  highCut: 5000
}

export const defaultSettings = {
  graphicEQ,
  overdrive,
  chorus,
  delay,
  reverb,
}

export const jazz = {
  graphicEQ: {
    ...graphicEQ,
    band250: 3,
    band500: 3,
    band1000: -6,
    band2000: -12,
  },
  overdrive,
  chorus,
  delay,
  reverb: {
    ...reverb,
    irIndex: 9,
    highCut: 1500
  }
}