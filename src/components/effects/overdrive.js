import React, { useState, useContext, useEffect } from 'react'
import { connect } from 'react-redux'
import Pedalboard from '../pedalboardContextProvider'
import Range from '../range'
import PowerBtn from '../powerBtn'
import Overdrive from '../../utils/audioBlocks/overdrive'


const Distortion = ({ midi, preset }) => {
  const { pb } = useContext(Pedalboard)
  const { overdrive } = preset
  const dist = pb.effects.find(fx => fx instanceof Overdrive)
  const [on, setOn] = useState(false)
  const [midFreq, setMidFreq] = useState(720)
  const [midGain, setMidGain] = useState(0)
  const [drive, setDrive] = useState(5)
  const [tone, setTone] = useState(12000)

  const handlePower = () => {
    if (on) {
      dist.input.connect(dist.output)
      dist.input.disconnect(dist.distortion)
      setOn(false)
    } else {
      dist.input.disconnect(dist.output)
      dist.input.connect(dist.distortion)
      setOn(true)
    }
  }

  const setDistortionLevel = (level) => {
    dist.distortion.gain.setValueAtTime(level, pb.ctx.currentTime)
    setDrive(level)
  }
  const setMidLevel = (level) => {
    dist.mid.gain.setValueAtTime(level, pb.ctx.currentTime)
    setMidGain(level)
  }
  const setMidFrequency = (freq) => {
    dist.mid.frequency.setValueAtTime(freq, pb.ctx.currentTime)
    setMidFreq(freq)
  }
  const setToneFrequency = (freq) => {
    dist.highCut.frequency.setValueAtTime(freq, pb.ctx.currentTime)
    setTone(freq)
  }

  useEffect(() => {
    for (let param in overdrive) {
      switch (param) {
        case 'on':
          if (on !== overdrive.on) handlePower()
          break
        case 'drive':
          setDistortionLevel(overdrive.drive)
          break
        case 'midFreq':
          setMidFrequency(overdrive.midFreq)
          break
        case 'midLevel':
          setMidLevel(overdrive.midLevel)
          break
        case 'tone':
          setToneFrequency(overdrive.tone)
          break
        default:
          continue
      }
    }
  }, [preset])

  useEffect(() => { if (midi.msg === 60) handlePower() }, [midi])


  return (
    <div className='rack'>
      <PowerBtn on={on} handlePower={handlePower} name='Drive' />
      <div className='flexRow grow jSpAr'>
        <Range name='Drive' min='1' max='11.11' value={drive} onChange={(e) => setDistortionLevel(e.target.value)} />
        <Range name='Mid Freq (Hz)' min='400' max='2000' value={midFreq} onChange={(e) => setMidFrequency(e.target.value)} />
        <Range name='Mid Level (dB)' min='-12' max='12' value={midGain} onChange={(e) => setMidLevel(e.target.value)} />
        <Range name='Tone (Hz)' min='1000' max='12000' value={tone} onChange={(e) => setToneFrequency(e.target.value)} />
      </div>
    </div>
  );
}

const mapStateToProps = ({ midi, preset }) => ({ midi, preset })

export default connect(mapStateToProps)(Distortion);