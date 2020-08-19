import React, { useState } from 'react'
// import { ThemeProvider, theme, CSSReset } from '@chakra-ui/core'
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

import './App.css'

function App() {
  const [pb, setPb] = useState(setup())
  return (
    <div className="App">
      <Pedalboard.Provider value={{ pb, setPb }}>
        {/* <ThemeProvider theme={theme}> */}
        {/* <CSSReset /> */}
        <StartContext />
        <InputEQ />
        <Distortion />
        <Chorus />
        <AnalogDelay />
        <ConvolutionReverb />
        {/* </ThemeProvider> */}
      </Pedalboard.Provider>

    </div>
  )
}

export default App
