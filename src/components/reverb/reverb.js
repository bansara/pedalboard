import React, { useState, useContext, useRef } from 'react'
import Pedalboard from '../pedalboardContextProvider'
import irSamples from './IR'
import Reverb from '../../utils/audioBlocks/reverb'
import Range from '../range'
import PowerBtn from '../powerBtn'

const ConvolutionReverb = () => {
  const { pb } = useContext(Pedalboard)
  const [ir, setIr] = useState(irSamples[0])
  const [dry, setDry] = useState(1) // 100%
  const [wet, setWet] = useState(0.5) // 50%
  const [lowCut, setLowCut] = useState(100) // Hz
  const [highCut, setHighCut] = useState(5000) // Hz
  const [on, setOn] = useState(false)
  const index = useRef(undefined)
  const verb = useRef(pb.effects.find(vb => vb instanceof Reverb))

  const handleChange = (e) => {
    const sample = irSamples.find(sample => sample.name === e.target.value)
    setIr(e.target.value)
    if (pb?.effects) {
      if (!verb.current) {
        verb.current = pb.effects.find(vb => vb instanceof Reverb)
      }
      index.current = pb.effects.indexOf(verb.current)
      const newVerb = new Reverb(pb.ctx, sample)
      verb.current.output.disconnect()

      if (index.current === 0) {
        pb.input.inputGain.disconnect()
        verb.current = newVerb
        pb.effects[index.current] = newVerb
        pb.input.inputGain.connect(newVerb.input)
        newVerb.output.connect(pb.effects[1].input)
      } else {
        pb.effects[index.current - 1].output.disconnect()
        verb.current = newVerb
        pb.effects[index.current] = newVerb
        pb.effects[index.current - 1].output.connect(verb.current.input)
        if (index.current === pb.effects.length - 1) {
          verb.current.output.connect(pb.output.masterVol)
        } else {
          verb.current.output.connect(pb.effects[index.current + 1].input)
        }
      }
    }
  }

  const setDryLevel = (e) => {
    setDry(e.target.value)
    if (!verb.current) {
      verb.current = pb.effects.find(vb => vb instanceof Reverb)
    }
    verb.current.dry.gain.setValueAtTime(e.target.value, pb.ctx.currentTime)
  }
  const setWetLevel = (e) => {
    setWet(e.target.value)
    if (!verb.current) {
      verb.current = pb?.effects?.find(vb => vb instanceof Reverb)
    }
    verb.current.wet.gain.setValueAtTime(e.target.value, pb.ctx.currentTime)
  }
  const setLowCutFreq = (e) => {
    setLowCut(e.target.value)
    if (!verb.current) {
      verb.current = pb?.effects?.find(vb => vb instanceof Reverb)
    }
    verb.current.lowCut.frequency.setValueAtTime(e.target.value, pb.ctx.currentTime)
  }
  const setHighCutFreq = (e) => {
    setHighCut(e.target.value)
    if (!verb.current) {
      verb.current = pb?.effects?.find(vb => vb instanceof Reverb)
    }
    verb.current.highCut.frequency.setValueAtTime(e.target.value, pb.ctx.currentTime)
  }
  const handlePower = () => {
    on
      ? verb.current.input.disconnect(verb.current.wet)
      : verb.current.input.connect(verb.current.wet)
    setOn(!on)
  }
  return (
    <div className='rack'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <PowerBtn on={on} handlePower={handlePower} />
        <select
          style={{ color: 'var(--dark)', height: '2em' }}
          value={ir}
          onChange={handleChange}
        >
          {
            irSamples.map(s => (
              <option key={s.name} value={s.name}>{s.name}</option>
            ))
          }
        </select>
      </div>
      <div className='rackRt'>
        <Range name='Dry' min='0' max='1' value={dry} onChange={setDryLevel} />
        <Range name='Wet' min='0' max='1' value={wet} onChange={setWetLevel} />
        <Range name='Low cut' min='50' max='500' value={lowCut} onChange={setLowCutFreq} />
        <Range name='High cut' min='1000' max='5000' value={highCut} onChange={setHighCutFreq} />
      </div>
    </div>
  );
}

export default ConvolutionReverb;