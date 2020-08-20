import React, { useState, useContext, useEffect } from 'react'
import { Flex } from '@chakra-ui/core'
import Pedalboard from '../pedalboardContextProvider'
import Preset from '../presetContextProvider'

import Delay from '../../utils/audioBlocks/delay'
import Range from '../range'
import PowerBtn from '../powerBtn'

const AnalogDelay = () => {
  const { pb } = useContext(Pedalboard)
  const { preset } = useContext(Preset)
  const { delay } = preset
  const dly = pb.effects.find(fx => fx instanceof Delay)
  const [on, setOn] = useState(false)
  const [dlyTime, setDlyTime] = useState(0.3) // in seconds
  const [feedback, setFeedback] = useState(0.3) // 20%
  const [filter, setFilter] = useState(2000) // Lowpass freq in Hz
  const [dry, setDry] = useState(1) // 100%
  const [wet, setWet] = useState(0.3) // 20%

  const setDelayTime = (time) => {
    setDlyTime(time)
    dly.delay.delayTime.linearRampToValueAtTime(time, pb.ctx.currentTime + 0.3)
  }
  const setFeedbackLevel = (level) => {
    setFeedback(level)
    dly.feedback.gain.setValueAtTime(level, pb.ctx.currentTime)
  }
  const setFilterFreq = (freq) => {
    setFilter(freq)
    dly.filter.frequency.setValueAtTime(freq, pb.ctx.currentTime)
  }
  const setDryLevel = (level) => {
    setDry(level)
    dly.dry.gain.setValueAtTime(level, pb.ctx.currentTime)
  }
  const setWetLevel = (level) => {
    setWet(level)
    dly.wet.gain.setValueAtTime(level, pb.ctx.currentTime)
  }
  const handlePower = () => {
    on
      ? dly.input.disconnect(dly.filter)
      : dly.input.connect(dly.filter)

    setOn(!on)
  }

  useEffect(() => {
    for (let param in delay) {
      switch (param) {
        case 'on':
          if (on !== delay.on) handlePower()
          break
        case 'time':
          setDelayTime(delay.time)
        case 'feedback':
          setFeedbackLevel(delay.feedback)
          break
        case 'filter':
          setFilterFreq(delay.filter)
          break
        case 'dry':
          setDryLevel(delay.dry)
          break
        case 'wet':
          setWetLevel(delay.wet)
          break
        default:
          continue
      }
    }
  }, [pb, preset])

  return (
    <Flex
      justify='space-between'
      align='center'
      wrap='wrap'
      p='1em'
      bg='var(--dark)'
      border='1px solid var(--black)'
    >
      <PowerBtn on={on} handlePower={handlePower} />
      <Range name='Time' min='0.05' max='1' value={dlyTime} onChange={(e) => setDelayTime(e.target.value)} />
      <Range name='Feedback' min='0' max='1' value={feedback} onChange={(e) => setFeedbackLevel(e.target.value)} />
      <Range name='Filter' min='500' max='10000' value={filter} onChange={(e) => setFilterFreq(e.target.value)} />
      <Range name='Dry' min='0' max='1' value={dry} onChange={(e) => setDryLevel(e.target.value)} />
      <Range name='Wet' min='0' max='1' value={wet} onChange={(e) => setWetLevel(e.target.value)} />
    </Flex>
  );
}

export default AnalogDelay;