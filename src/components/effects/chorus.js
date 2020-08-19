import React, { useState, useContext, useRef } from 'react'
import Pedalboard from '../pedalboardContextProvider'
import Range from '../range'
import PowerBtn from '../powerBtn'
import { Chorus } from '../../utils/audioBlocks'

const ClassicChorus = () => {
  const { pb } = useContext(Pedalboard)
  const cho = useRef(pb.effects.find(fx => fx instanceof Chorus))
  const [on, setOn] = useState(false)
  const [rate, setRate] = useState(3)
  const [depth, setDepth] = useState(5)
  const [delay, setDelay] = useState(3)

  const handlePower = () => {
    if (on) {
      cho.current.input.disconnect(cho.current.delay1)
      cho.current.input.disconnect(cho.current.delay2)
    } else {
      cho.current.input.connect(cho.current.delay1)
      cho.current.input.connect(cho.current.delay2)
    }
    setOn(!on)
  }

  const setLfoRate = (e) => {
    const rate = e.target.value
    if (!cho.current) {
      cho.current = pb.effects.find(fx => fx instanceof Chorus)
    }
    setRate(rate)
    cho.current.lfo.osc.frequency.linearRampToValueAtTime(rate, pb.ctx.currentTime + 0.3)
  }
  const setLfoDepth = (e) => {
    const depth = e.target.value / 10000
    if (!cho.current) {
      cho.current = pb.effects.find(fx => fx instanceof Chorus)
    }
    setDepth(e.target.value)
    cho.current.lfo.output.gain.linearRampToValueAtTime(depth, pb.ctx.currentTime + 0.3)
  }

  const setDlyTime = (e) => {
    const time = e.target.value / 1000
    if (!cho.current) {
      cho.current = pb.effects.find(fx => fx instanceof Chorus)
    }
    setDelay(e.target.value)
    cho.current.delay1.delayTime.linearRampToValueAtTime(time, pb.ctx.currentTime + 0.1)
    cho.current.delay2.delayTime.linearRampToValueAtTime(time + 0.004, pb.ctx.currentTime + 0.3)
  }

  return (
    <div className='rack'>
      <PowerBtn on={on} handlePower={handlePower} />
      <Range name='Rate (hz)' min='0.25' max='7' value={rate} onChange={setLfoRate} />
      <Range name='Depth' min='1' max='10' value={depth} onChange={setLfoDepth} />
      <Range name='Delay (ms)' min='1' max='30' value={delay} onChange={setDlyTime} />
    </div>
  );
}

export default ClassicChorus;