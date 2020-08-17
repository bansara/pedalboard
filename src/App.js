import React, { useState } from 'react';
import { ThemeProvider, theme, CSSReset } from '@chakra-ui/core'
import StartContext from './components/startContext';
import { CtxState, InputSelect, InputMeter } from './components/input';
import Pedalboard from './components/pedalboardContextProvider';

import './App.css';

function App() {
  const [pb, setPb] = useState(null)
  return (
    <div className="App">
      <Pedalboard.Provider value={{ pb, setPb }}>
        <ThemeProvider theme={theme}>
          <CSSReset />
          <StartContext />
          <CtxState />
          <InputSelect />
          <InputMeter />
        </ThemeProvider>
      </Pedalboard.Provider>

    </div>
  );
}

export default App;
