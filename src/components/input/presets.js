import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { defaultSettings, jazz, classicRock, spaceChorus, metal, postRock } from '../../utils/defaultSettings'
import { setPreset } from '../store/actions'


const Presets = ({ midi, setPreset }) => {

  const presets = [
    {
      name: 'Default',
      data: defaultSettings,
      note: 120
    },
    {
      name: 'Space Chorus',
      data: spaceChorus,
      note: 121
    },
    {
      name: 'Classic Rock',
      data: classicRock,
      note: 122
    },
    {
      name: 'Post Rock',
      data: postRock,
      note: 123
    },
    {
      name: 'Jazz',
      data: jazz,
      note: 124
    },
    {
      name: 'Metal',
      data: metal,
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
    // eslint-disable-next-line
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
