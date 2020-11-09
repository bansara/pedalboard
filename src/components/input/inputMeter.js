import React, { useState, useEffect, useContext, useRef } from 'react'
import Pedalboard from '../pedalboardContextProvider'
import { draw } from '../../utils/meter'

const InputMeter = () => {
  const { pb } = useContext(Pedalboard)
  const [connected, setConnected] = useState(false)
  const canvas = useRef(null)

  useEffect(() => {
    if (!connected && pb?.input?.analyser && pb?.input?.source) {

      const bufferLength = 32
      const dataArray = new Uint8Array(bufferLength)

      draw(canvas.current, pb.input.analyser, dataArray)
      setConnected(true)
    }
  }, [connected, pb])

  return (
    <canvas id='inputMeter' className='meterCanvas' ref={canvas} />
  );
}

export default InputMeter;