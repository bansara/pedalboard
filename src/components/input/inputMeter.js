import React, { useState, useEffect, useContext } from 'react'
import Pedalboard from '../pedalboardContextProvider'
import { draw } from '../../utils/meter'

const InputMeter = () => {
  const { pb } = useContext(Pedalboard)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    if (!connected && pb?.input?.analyser && pb?.input?.source) {

      const bufferLength = 32
      const dataArray = new Uint8Array(bufferLength)
      const canvas = document.getElementById('inputMeter')

      draw(canvas, pb.input.analyser, dataArray)
      setConnected(true)
    }
  }, [connected, pb])

  return (
    <canvas id='inputMeter' className='meterCanvas' />
  );
}

export default InputMeter;