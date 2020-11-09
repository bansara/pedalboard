import React, { useState, useEffect, useContext } from 'react'
import Pedalboard from '../pedalboardContextProvider'

const InputSelect = () => {
  const { pb, setPb } = useContext(Pedalboard)
  const [devices, setDevices] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    setDevices(pb?.input?.inputDevices)
  }, [pb])

  const handleInput = (e) => {
    setInput(e.target.value)
    const selectedDevice = pb.input.inputDevices.find(d => d.deviceId === e.target.value)
    console.log('selected device', selectedDevice)
    if (selectedDevice) {
      const constraints = {
        audio: {
          deviceId: selectedDevice.deviceId,
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          sampleSize: 16
        },
        video: false
      }
      if (navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia(constraints)
          .then(media => {
            const source = pb.ctx.createMediaStreamSource(media);
            if (!pb.input.source) {
              pb.input.source = source
              source.connect(pb.input.inputGain)
              // source.connect(pb.input.analyser)
            } else {
              pb.input.source.disconnect()
              pb.input.source = source
              source.connect(pb.input.inputGain)
              // source.connect(pb.input.analyser)
            }
            setPb({ ...pb })
          })
      } else {
        if (pb.input.source) {
          pb.input.source.disconnect(pb.input.inputGain)
          // pb.input.source.disconnect(pb.input.analyser)
        }
      }
    }
  }

  return (
    <div>
      <select
        value={input}
        onChange={handleInput}
        style={{ color: 'var(--dark)' }}
      >
        <option value=''>Select Audio Source</option>
        {
          devices
            // ?.filter((d, i) => i > 0)
            ?.map(d => (
              <option
                key={d.deviceId}
                value={d.deviceId}
              >
                {d.label}
              </option>
            ))
        }
      </select>
    </div>
  );
}

export default InputSelect;