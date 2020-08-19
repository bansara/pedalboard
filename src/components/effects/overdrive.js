import React, { useState, useContext, useRef } from 'react'
import Pedalboard from '../pedalboardContextProvider'
import Range from '../range'
import PowerBtn from '../powerBtn'
import Overdrive from '../../utils/audioBlocks/overdrive'

const Distortion = () => {
  const { pb } = useContext(Pedalboard)
  const dist = useRef(pb.effects.find(fx => fx instanceof Overdrive));

  const [on, setOn] = useState(false)
  const [midFreq, setMidFreq] = useState(720)
  const [midGain, setMidGain] = useState(0)
  const [drive, setDrive] = useState(5)
  const [tone, setTone] = useState(12000)

  const handlePower = () => {
    if (on) {
      dist.current.input.connect(dist.current.output)
      dist.current.input.disconnect(dist.current.distortion)
    } else {
      dist.current.input.disconnect(dist.current.output)
      dist.current.input.connect(dist.current.distortion)
    }
    setOn(!on)
  }

  const setDistortionLevel = (e) => {
    const level = e.target.value
    if (!dist.current) {
      dist.current = pb.effects.find(fx => fx instanceof Overdrive)
    }
    dist.current.distortion.gain.setValueAtTime(level, pb.ctx.currentTime)
    setDrive(level)
  }
  const setMidLevel = (e) => {
    const level = e.target.value
    if (!dist.current) {
      dist.current = pb.effects.find(fx => fx instanceof Overdrive)
    }
    dist.current.mid.gain.setValueAtTime(level, pb.ctx.currentTime)
    setMidGain(level)
  }
  const setMidFrequency = (e) => {
    const freq = e.target.value
    if (!dist.current) {
      dist.current = pb.effects.find(fx => fx instanceof Overdrive)
    }
    dist.current.mid.frequency.setValueAtTime(freq, pb.ctx.currentTime)
    setMidFreq(freq)
  }
  const setToneFrequency = (e) => {
    const freq = e.target.value
    if (!dist.current) {
      dist.current = pb.effects.find(fx => fx instanceof Overdrive)
    }
    dist.current.highCut.frequency.setValueAtTime(freq, pb.ctx.currentTime)
    setTone(freq)
  }

  return (
    <div className='rack'>
      <PowerBtn on={on} handlePower={handlePower} />
      <Range name='Drive' min='1' max='11.11' value={drive} onChange={setDistortionLevel} />
      <Range name='Mid Freq' min='400' max='2000' value={midFreq} onChange={setMidFrequency} />
      <Range name='Mid Level' min='-12' max='12' value={midGain} onChange={setMidLevel} />
      <Range name='Tone' min='1000' max='12000' value={tone} onChange={setToneFrequency} />
    </div>
  );
}

export default Distortion;