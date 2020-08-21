import React, { useState, useContext, useEffect } from 'react'
import { connect } from 'react-redux'
import Pedalboard from '../pedalboardContextProvider'
import Range from '../range'
import PowerBtn from '../powerBtn'
import { Chorus } from '../../utils/audioBlocks'

const ClassicChorus = ({ midi, preset }) => {
  const { pb } = useContext(Pedalboard)
  const { chorus } = preset
  const cho = pb.effects.find(fx => fx instanceof Chorus)
  const [on, setOn] = useState(false)
  const [rate, setRate] = useState(3)
  const [depth, setDepth] = useState(5)
  const [delay, setDelay] = useState(3)

  const handlePower = () => {
    if (on) {
      cho.input.disconnect(cho.delay1)
      cho.input.disconnect(cho.delay2)
    } else {
      cho.input.connect(cho.delay1)
      cho.input.connect(cho.delay2)
    }
    setOn(!on)
  }

  const setLfoRate = (val) => {
    const rate = val
    setRate(val)
    cho.lfo.osc.frequency.linearRampToValueAtTime(rate, pb.ctx.currentTime + 0.3)
  }
  const setLfoDepth = (val) => {
    const depth = val / 10000

    setDepth(val)
    cho.lfo.output.gain.linearRampToValueAtTime(depth, pb.ctx.currentTime + 0.3)
  }

  const setDlyTime = (val) => {
    const time = val / 1000
    setDelay(val)
    cho.delay1.delayTime.linearRampToValueAtTime(time, pb.ctx.currentTime + 0.1)
    cho.delay2.delayTime.linearRampToValueAtTime(time + 0.004, pb.ctx.currentTime + 0.3)
  }

  useEffect(() => {
    for (let param in chorus) {
      switch (param) {
        case 'on':
          if (on !== chorus.on) handlePower()
          break
        case 'rate':
          setLfoRate(chorus.rate)
          break
        case 'depth':
          setLfoDepth(chorus.depth)
          break
        case 'delay':
          setDlyTime(chorus.delay)
          break
        default:
          continue
      }
    }
  }, [preset, pb])

  useEffect(() => { if (midi.msg === 66) handlePower() }, [midi])

  return (
    <div className='rack'>
      <PowerBtn on={on} handlePower={handlePower} name='Chorus' />
      <div className='flexRow grow jSpAr'>
        <Range name='Rate (hz)' min='0.25' max='7' value={rate} onChange={(e) => setLfoRate(e.target.value)} />
        <Range name='Depth' min='1' max='10' value={depth} onChange={(e) => setLfoDepth(e.target.value)} />
        <Range name='Delay (ms)' min='1' max='30' value={delay} onChange={(e) => setDlyTime(e.target.value)} />
      </div>
    </div>
  );
}

const mapStateToProps = ({ midi, preset }) => ({ midi, preset })

export default connect(mapStateToProps)(ClassicChorus);