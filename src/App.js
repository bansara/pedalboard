import React, { useState } from 'react';
import { ThemeProvider, theme, CSSReset } from '@chakra-ui/core'
import StartContext from './components/startContext';
import { CtxState, InputSelect, InputMeter } from './components/input';
import ConvolutionReverb from './components/reverb/reverb'
import AnalogDelay from './components/delay/delay'
import Pedalboard from './components/pedalboardContextProvider';
import setup from './utils/initialSetup';

import './App.css';

function App() {
  const [pb, setPb] = useState(setup())
  return (
    <div className="App">
      <Pedalboard.Provider value={{ pb, setPb }}>
        <ThemeProvider theme={theme}>
          <CSSReset />
          <StartContext />
          <CtxState />
          <InputSelect />
          <InputMeter />
          <AnalogDelay />
          <ConvolutionReverb />
        </ThemeProvider>
      </Pedalboard.Provider>

    </div>
  );
}

export default App;
