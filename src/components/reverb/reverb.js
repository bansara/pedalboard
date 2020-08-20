import React, { useState, useContext, useRef, useEffect, useCallback } from 'react'
import Pedalboard from '../pedalboardContextProvider'
import Preset from '../presetContextProvider'
import irSamples from './IR'
import Reverb from '../../utils/audioBlocks/reverb'
import Range from '../range'
import PowerBtn from '../powerBtn'

const ConvolutionReverb = () => {
  const { pb } = useContext(Pedalboard)
  const { preset } = useContext(Preset)
  const { reverb } = preset
  const [ir, setIr] = useState('')
  const [dry, setDry] = useState(1) // 100%
  const [wet, setWet] = useState(0.5) // 50%
  const [lowCut, setLowCut] = useState(100) // Hz
  const [highCut, setHighCut] = useState(5000) // Hz
  const [on, setOn] = useState(false)
  const verb = useRef(pb.effects.find(vb => vb instanceof Reverb))

  const handleChange = useCallback((idx, isOn) => {
    const sample = irSamples[idx]
    setIr(idx)
    if (pb?.effects) {
      if (!verb.current) {
        verb.current = pb.effects.find(vb => vb instanceof Reverb)
      }
      if (isOn) {
        const index = pb.effects.indexOf(verb.current)
        const newVerb = new Reverb(pb.ctx, sample)
        verb.current.output.disconnect()

        if (index.current === 0) {
          pb.input.inputGain.disconnect()
          verb.current = newVerb
          pb.effects[index] = newVerb
          pb.input.inputGain.connect(newVerb.input)
          newVerb.output.connect(pb.effects[1].input)
        } else {
          pb.effects[index - 1].output.disconnect()
          verb.current = newVerb
          pb.effects[index] = newVerb
          pb.effects[index - 1].output.connect(verb.current.input)
          if (index === pb.effects.length - 1) {
            verb.current.output.connect(pb.output.masterVol)
          } else {
            verb.current.output.connect(pb.effects[index + 1].input)
          }
        }
      }
    }
  }, [pb, verb])

  const setDryLevel = useCallback((level) => {
    setDry(level)
    if (!verb.current) {
      verb.current = pb.effects.find(vb => vb instanceof Reverb)
    }
    verb.current.dry.gain.setValueAtTime(level, pb.ctx.currentTime)
  }, [verb, pb])
  const setWetLevel = useCallback((level) => {
    setWet(level)
    if (!verb.current) {
      verb.current = pb?.effects?.find(vb => vb instanceof Reverb)
    }
    verb.current.wet.gain.setValueAtTime(level, pb.ctx.currentTime)
  }, [verb, pb])
  const setLowCutFreq = useCallback((freq) => {
    setLowCut(freq)
    if (!verb.current) {
      verb.current = pb?.effects?.find(vb => vb instanceof Reverb)
    }
    verb.current.lowCut.frequency.setValueAtTime(freq, pb.ctx.currentTime)
  }, [verb, pb])
  const setHighCutFreq = useCallback((freq) => {
    setHighCut(freq)
    if (!verb.current) {
      verb.current = pb?.effects?.find(vb => vb instanceof Reverb)
    }
    verb.current.highCut.frequency.setValueAtTime(freq, pb.ctx.currentTime)
  }, [verb, pb])

  const handlePower = () => {
    on
      ? verb.current.input.disconnect(verb.current.wet)
      : verb.current.input.connect(verb.current.wet)
    setOn(!on)
  }

  useEffect(() => {
    for (let param in reverb) {
      switch (param) {
        case 'on':
          if (on !== reverb.on) handlePower()
          break
        case 'irIndex':
          handleChange(reverb.irIndex, reverb.on)
          break
        case 'dry':
          setDryLevel(reverb.dry)
          break
        case 'wet':
          setWetLevel(reverb.wet)
          break
        case 'lowCut':
          setLowCutFreq(reverb.lowCut)
          break
        case 'highCut':
          setHighCutFreq(reverb.highCut)
          break
        default:
          continue
      }
    }
  }, [preset, reverb])

  return (
    <div className='rack'>
      <PowerBtn on={on} handlePower={handlePower} />
      <div className='flexRow grow jSpAr aCenter'>
        <select
          style={{ color: 'var(--dark)', height: '2em' }}
          value={ir}
          onChange={(e) => handleChange(e.target.value, on)}
        >
          {
            irSamples.map((s, i) => (
              <option key={s.name} value={i}>{s.name}</option>
            ))
          }
        </select>
        <Range name='Dry' min='0' max='1' value={dry} onChange={(e) => setDryLevel(e.target.value)} />
        <Range name='Wet' min='0' max='1' value={wet} onChange={(e) => setWetLevel(e.target.value)} />
        <Range name='Low cut (Hz)' min='50' max='500' value={lowCut} onChange={(e) => setLowCutFreq(e.target.value)} />
        <Range name='High cut (Hz)' min='1000' max='5000' value={highCut} onChange={(e) => setHighCutFreq(e.target.value)} />
      </div>
    </div>
  );
}

export default ConvolutionReverb;