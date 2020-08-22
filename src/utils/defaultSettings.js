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
  on: false,
  gain: 2,
  midFreq: 720,
  midLevel: 0,
  tone: 12000
}
const chorus = {
  on: false,
  rate: 3,
  depth: 5,
  delay: 3
}
const delay = {
  on: false,
  time: 0.3,
  feedback: 0.3,
  filter: 2000,
  dry: 1,
  wet: 0.3
}
const reverb = {
  on: true,
  irIndex: 0,
  dry: 1,
  wet: 0.2,
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
    on: true,
    irIndex: 2,
    highCut: 1500
  }
}

export const classicRock = {
  graphicEQ,
  overdrive: {
    on: true,
    gain: 5,
    midFreq: 720,
    midLevel: 3.36,
    tone: 7720
  },
  chorus,
  delay: {
    ...delay,
    time: 0.25
  },
  reverb: {
    ...reverb,
    on: true,
    irIndex: 4,
    highCut: 3950,
    wet: 0.5
  }
}

export const spaceChorus = {
  graphicEQ,
  overdrive,
  chorus: {
    ...chorus,
    on: true,
  },
  delay: {
    ...delay,
    on: true,
    time: 0.25
  },
  reverb: {
    ...reverb,
    on: true
  }
}

export const metal = {
  graphicEQ: {
    band62: 12,
    band125: 12,
    band250: 12,
    band500: 12,
    band1000: 12,
    band2000: 12,
    band4000: 12,
    band8000: 12,
  },
  overdrive: {
    on: true,
    gain: 11,
    midFreq: 900,
    midLevel: -12,
    tone: 12000
  },
  chorus,
  delay,
  reverb: {
    ...reverb,
    on: true,
    irIndex: 5
  }
}

export const postRock = {
  graphicEQ,
  overdrive: {
    ...overdrive,
    on: true,
    gain: 2
  },
  chorus,
  delay: {
    ...delay,
    on: true,
    time: 0.4,
    feedback: 0.5,
    wet: 0.77
  },
  reverb: {
    ...reverb,
    on: true,
    irIndex: 6,
    wet: 0.7
  }
}
