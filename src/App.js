import React, { useState, useEffect } from 'react'
import { StartContext } from './components/input'
import ConvolutionReverb from './components/reverb/reverb'
import {
  AnalogDelay,
  Distortion,
  InputEQ,
  Chorus
} from './components/effects'
import Pedalboard from './components/pedalboardContextProvider'
import setup from './utils/initialSetup'
import { midiAccess } from './utils/midi'


function App() {
  const [pb, setPb] = useState(setup())
  useEffect(() => {
    midiAccess()
  }, [])
  return (
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
  )
}

export default App
