import React, { useState, useContext, useEffect } from 'react'
import { connect } from 'react-redux'

import Pedalboard from '../pedalboardContextProvider'
import irSamples from './IR'
import Reverb from '../../utils/audioBlocks/reverb'
import Range from '../range'
import PowerBtn from '../powerBtn'

const ConvolutionReverb = ({ midi, preset }) => {
  const { pb } = useContext(Pedalboard)
  const { reverb } = preset
  const [ir, setIr] = useState(0)
  const [dry, setDry] = useState(1) // 100%
  const [wet, setWet] = useState(0.5) // 50%
  const [lowCut, setLowCut] = useState(100) // Hz
  const [highCut, setHighCut] = useState(5000) // Hz
  const [on, setOn] = useState(false)
  let verb = pb.effects.find(vb => vb instanceof Reverb)

  const handleChange = (idx, isOn) => {
    const sample = irSamples[idx]
    const newVerb = new Reverb(pb.ctx, sample)
    setIr(idx)
    console.log('reverb', reverb)
    const index = pb.effects.indexOf(verb)
    verb = newVerb
    pb.effects[index] = newVerb
    if (!isOn) {
      verb.input.disconnect(verb.wet)
    }
    console.log('ison block')
    verb.output.disconnect()

    pb.effects[index - 1].output.disconnect()
    pb.effects[index - 1].output.connect(verb.input)
    verb.output.connect(pb.output.masterVol)
  }


  const setDryLevel = (level) => {
    setDry(level)
    verb.dry.gain.setValueAtTime(level, pb.ctx.currentTime)
  }
  const setWetLevel = (level) => {
    setWet(level)
    verb.wet.gain.setValueAtTime(level, pb.ctx.currentTime)
  }
  const setLowCutFreq = (freq) => {
    setLowCut(freq)
    verb.lowCut.frequency.setValueAtTime(freq, pb.ctx.currentTime)
  }
  const setHighCutFreq = (freq) => {
    setHighCut(freq)
    verb.highCut.frequency.setValueAtTime(freq, pb.ctx.currentTime)
  }

  const handlePower = () => {
    console.log('power')
    on
      ? verb.lowCut.disconnect(verb.highCut)
      : verb.lowCut.connect(verb.highCut)
    setOn(!on)
  }

  useEffect(() => {
    for (let param in reverb) {
      switch (param) {
        case 'on':
          if (on !== reverb.on) handlePower()
          break
        case 'irIndex':
          if (reverb.irIndex !== ir) {
            handleChange(reverb.irIndex, reverb.on)
          }
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
    // eslint-disable-next-line
  }, [preset, reverb])

  // eslint-disable-next-line
  useEffect(() => { if (midi.msg === 72) handlePower() }, [midi])

  return (
    <div className='rack'>
      <div className='flexRow aCenter jCenter min'>
        <PowerBtn on={on} handlePower={handlePower} name='Reverb' />
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
      </div>
      <div className='flexRow grow jSpAr aCenter wrap'>
        <Range name='Dry' min='0' max='1' value={dry} onChange={(e) => setDryLevel(e.target.value)} />
        <Range name='Wet' min='0' max='1' value={wet} onChange={(e) => setWetLevel(e.target.value)} />
        <Range name='Low cut (Hz)' min='50' max='500' value={lowCut} onChange={(e) => setLowCutFreq(e.target.value)} />
        <Range name='High cut (Hz)' min='1000' max='5000' value={highCut} onChange={(e) => setHighCutFreq(e.target.value)} />
      </div>
    </div>
  )
}

const mapStateToProps = ({ midi, preset }) => ({ midi, preset })

export default connect(mapStateToProps)(ConvolutionReverb);