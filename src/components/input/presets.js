import React, { useContext, useState } from 'react';
import Preset from '../presetContextProvider'
import { defaultSettings, jazz } from '../../utils/defaultSettings'

const Presets = () => {
  const { setPreset } = useContext(Preset)
  const [patch, setPatch] = useState('default')

  const handleChange = () => {
    console.log('preset button')
    switch (patch) {
      case 'default':
        setPreset(defaultSettings)
        break
      case 'jazz':
        setPreset(jazz)
        break
      default:
        return
    }
    //   case 'jazz':
    //     break
    // 
  }
  // if (patch === 'jazz') {
  //   console.log('called')
  // }


  return (
    <div>
      <select
        value={patch}
        onChange={e => setPatch(e.target.value)}
      >
        <option value='default'>Default</option>
        <option value='jazz'>Jazzy</option>
      </select>
      <button
        onClick={() => handleChange()}
      >
        Load Preset
      </button>
    </div>
  );
}

export default Presets;