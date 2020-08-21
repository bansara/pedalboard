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
import Preset from './components/presetContextProvider'
import setup from './utils/initialSetup'
import { defaultSettings } from './utils/defaultSettings'
import { midiAccess } from './utils/midi'


function App() {
  const [pb, setPb] = useState(setup())
  const [preset, setPreset] = useState(defaultSettings)
  useEffect(() => {
    midiAccess()
  }, [])
  return (
    <div className="App">
      <Pedalboard.Provider value={{ pb, setPb }}>
        <Preset.Provider value={{ preset, setPreset }}>
          <StartContext />
          <InputEQ />
          <Distortion />
          <Chorus />
          <AnalogDelay />
          <ConvolutionReverb />
        </Preset.Provider>
      </Pedalboard.Provider>

    </div >
  )
}

export default App
