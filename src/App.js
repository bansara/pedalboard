import React, { useState, useEffect } from 'react'
import { StartContext } from './components/input'
import ConvolutionReverb from './components/reverb/reverb'
import {
  AnalogDelay,
  Distortion,
  InputEQ,
  Chorus
} from './components/effects'
import Welcome from './components/welcome'
import Pedalboard from './components/pedalboardContextProvider'
import { midiAccess } from './utils/midi'


function App() {
  const [pb, setPb] = useState(null)
  const [midiLoaded, setMidiLoaded] = useState(false)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    if (pb && !midiLoaded) {
      midiAccess()
      setMidiLoaded(true)
    }
  }, [pb, midiLoaded])
  return (
    <div>
      {
        !started ?
          <Welcome setStarted={setStarted} setPb={setPb} />
          :
          <div className="App">
            <Pedalboard.Provider value={{ pb, setPb }}>
              <StartContext />
              <InputEQ />
              <Distortion />
              <Chorus />
              <AnalogDelay />
              <ConvolutionReverb />
            </Pedalboard.Provider>
          </div >
      }
    </div>
  )
}

export default App
