import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { defaultSettings, jazz, classicRock, spaceChorus, metal, psyLead } from '../../utils/defaultSettings'
import { setPreset } from '../store/actions'


const Presets = ({ midi, setPreset }) => {

  const presets = [
    {
      name: 'Default',
      data: defaultSettings,
      note: 120
    },
    {
      name: 'Classic Rock',
      data: classicRock,
      note: 121
    },
    {
      name: 'Space Chorus',
      data: spaceChorus,
      note: 122
    },
    {
      name: 'Metal',
      data: metal,
      note: 123
    },
    {
      name: 'Psy Lead',
      data: psyLead,
      note: 124
    },
    {
      name: 'Jazz',
      data: jazz,
      note: 24
    },
  ]

  const [patch, setPatch] = useState(presets[0])


  const handleChange = () => {
    const preset = presets.find(pre => pre.name === patch)
    setPreset(preset.data)
    console.log(preset.data)
  }
  const handleMidiInput = (msg) => {
    const preset = presets.find(pre => pre.note === msg)
    if (preset) {
      setPreset(preset.data)
      setPatch(preset.name)
    }
    console.log(preset)
  }

  useEffect(() => {
    handleMidiInput(midi.msg)
  }, [midi])

  return (
    <div>
      <button
        className='inputBtn'
        onClick={() => handleChange()}
      >
        Load Preset
      </button>
      <select
        value={patch}
        onChange={e => setPatch(e.target.value)}
      >
        {
          presets?.map(p => (
            <option
              key={p.note}
              value={p.name}
            >
              {p.name}
            </option>
          ))
        }
      </select>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPreset: (preset) => setPreset(dispatch, preset)
  }
}

const mapStateToProps = ({ midi }) => ({ midi })

export default connect(mapStateToProps, mapDispatchToProps)(Presets)

{/* <option value='default'>Default</option>
        <option value='classicRock'>Classic Rock</option>
        <option value='spaceChorus'>Space Chorus</option>
        <option value='metal'>Metal</option>
        <option value='psyLead'>Psy Lead</option>
        <option value='jazz'>Jazzy</option> */}