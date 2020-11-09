export const parseOptions = (options, param, defaultValue) => {
  // ES2020 yay!!
  return options?.[param] ?? defaultValue
}

export const createOsc = (context, type = 'sine') => {
  const osc = context.createOscillator()
  osc.type = type
  osc.frequency.value = 220
  osc.start()
  return osc
}

export const createGain = (context, level = 1) => {
  const gain = context.createGain()
  gain.gain.value = level
  return gain
}

export const lfo = (context, options = {}) => {
  const lfo = createOsc(context)
  const output = createGain(context)
  lfo.frequency.value = parseOptions(options, 'frequency', 5)
  output.gain.value = parseOptions(options, 'gain', 1)
  lfo.connect(output)
  return {
    osc: lfo,
    output
  }
}

export const createEq = (context, type = 'peaking', freq = 1000, q = 1) => {
  const eq = context.createBiquadFilter()
  eq.type = type
  eq.frequency.value = freq
  if (type = 'peaking') {
    eq.Q.value = q
  }
  return eq
}

export const constructEqBands = (self, bands) => {
  const frequencies = bands.map(band => {
    const freqName = `band${Math.floor(band.frequency.value)}`
    self[freqName] = band
    return self[freqName]
  })
  for (let i = 0; i < frequencies.length - 1; i++) {
    frequencies[i].connect(frequencies[i + 1])
  }
  return frequencies
}

export const createIO = (context, self, inputGain = 1, outputGain = 1) => {
  const input = context.createGain()
  const output = context.createGain()
  input.gain.value = inputGain
  output.gain.value = outputGain
  self['input'] = input
  self['output'] = output

  return [input, output]
}

export const createAnalyser = (context) => {
  const analyser = context.createAnalyser()
  analyser.fftSize = 64
  return analyser
}

