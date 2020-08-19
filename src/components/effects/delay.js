import React, { useState, useContext, useRef } from 'react'
import { Flex } from '@chakra-ui/core'
import Pedalboard from '../pedalboardContextProvider'
import Delay from '../../utils/audioBlocks/delay'
import Flanger from '../../utils/audioBlocks/flanger'
import Range from '../range'
import PowerBtn from '../powerBtn'

const AnalogDelay = () => {
  const { pb } = useContext(Pedalboard)
  const dly = useRef(pb.effects.find(fx => fx instanceof Delay && !(fx instanceof Flanger)));
  const [on, setOn] = useState(false)
  const [delay, setDelay] = useState(0.3) // in seconds
  const [feedback, setFeedback] = useState(0.3) // 20%
  const [filter, setFilter] = useState(2000) // Lowpass freq in Hz
  const [dry, setDry] = useState(1) // 100%
  const [wet, setWet] = useState(0.3) // 20%

  const setDelayTime = (e) => {
    const time = e.target.value
    // if (!dly.current) {
    //   dly.current = pb.effects.find(fx => fx instanceof Delay && !(fx instanceof Flanger))
    // }
    setDelay(time)
    dly.current.delay.delayTime.linearRampToValueAtTime(time, pb.ctx.currentTime + 0.3)
  }
  const setFeedbackLevel = (e) => {
    const level = e.target.value
    // if (!dly.current) {
    //   dly.current = pb.effects.find(fx => fx instanceof Delay)
    // }
    setFeedback(level)
    dly.current.feedback.gain.setValueAtTime(level, pb.ctx.currentTime)
  }
  const setFilterFreq = (e) => {
    const freq = e.target.value
    // if (!dly.current) {
    //   dly.current = pb.effects.find(fx => fx instanceof Delay)
    // }
    setFilter(freq)
    dly.current.filter.frequency.setValueAtTime(freq, pb.ctx.currentTime)
  }
  const setDryLevel = (e) => {
    const level = e.target.value
    // if (!dly.current) {
    //   dly.current = pb.effects.find(fx => fx instanceof Delay)
    // }
    setDry(level)
    dly.current.dry.gain.setValueAtTime(level, pb.ctx.currentTime)
  }
  const setWetLevel = (e) => {
    const level = e.target.value
    // if (!dly.current) {
    //   dly.current = pb.effects.find(fx => fx instanceof Delay)
    // }
    setWet(level)
    dly.current.wet.gain.setValueAtTime(level, pb.ctx.currentTime)
  }
  const handlePower = () => {
    on
      ? dly.current.input.disconnect(dly.current.filter)
      : dly.current.input.connect(dly.current.filter)

    setOn(!on)
  }

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
      <Range name='Time' min='0.05' max='1' value={delay} onChange={setDelayTime} />
      <Range name='Feedback' min='0' max='1' value={feedback} onChange={setFeedbackLevel} />
      <Range name='Filter' min='500' max='10000' value={filter} onChange={setFilterFreq} />
      <Range name='Dry' min='0' max='1' value={dry} onChange={setDryLevel} />
      <Range name='Wet' min='0' max='1' value={wet} onChange={setWetLevel} />
    </Flex>
  );
}

export default AnalogDelay;