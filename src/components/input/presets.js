import React, { useContext, useState } from 'react';
import Preset from '../presetContextProvider'
import { defaultSettings, jazz, classicRock, spaceChorus, metal, psyLead } from '../../utils/defaultSettings'

const Presets = () => {
  const { setPreset } = useContext(Preset)
  const [patch, setPatch] = useState('default')

  const handleChange = () => {
    switch (patch) {
      case 'default':
        setPreset(defaultSettings)
        break
      case 'classicRock':
        setPreset(classicRock)
        break
      case 'spaceChorus':
        setPreset(spaceChorus)
        break
      case 'metal':
        setPreset(metal)
        break
      case 'psyLead':
        setPreset(psyLead)
        break
      case 'jazz':
        setPreset(jazz)
        break
      default:
        return
    }
  }

  return (
    <div>
      <button
        className='inputBtn'
        style={{ margin: '0 0.5em' }}
        onClick={() => handleChange()}
      >
        Load Preset
      </button>
      <select
        value={patch}
        onChange={e => setPatch(e.target.value)}
      >
        <option value='default'>Default</option>
        <option value='classicRock'>Classic Rock</option>
        <option value='spaceChorus'>Space Chorus</option>
        <option value='metal'>Metal</option>
        <option value='psyLead'>Psy Lead</option>
        <option value='jazz'>Jazzy</option>
      </select>
    </div>
  );
}

export default Presets;