import React, { useContext, useState, useEffect } from 'react'
import Pedalboard from '../pedalboardContextProvider'
import Preset from '../presetContextProvider'
import GraphicEQ from '../../utils/audioBlocks/graphicEQ'
import Range from '../range'

const InputEQ = () => {
  const { pb } = useContext(Pedalboard)
  const { preset } = useContext(Preset)
  const { graphicEQ: geq } = preset
  const eq = pb?.effects?.find(fx => fx instanceof GraphicEQ)

  const [eq62, setEq62] = useState(geq.band62)
  const [eq125, setEq125] = useState(geq.band125)
  const [eq250, setEq250] = useState(geq.band250)
  const [eq500, setEq500] = useState(geq.band500)
  const [eq1000, setEq1000] = useState(geq.band1000)
  const [eq2000, setEq2000] = useState(geq.band2000)
  const [eq4000, setEq4000] = useState(geq.band4000)
  const [eq8000, setEq8000] = useState(geq.band8000)

  useEffect(() => {
    console.log('useEffect')
    for (let band in preset.graphicEQ) {
      if (preset.graphicEQ[band] !== eq[band].gain.value) {
        console.log('if')
        eq.setValue(band, 'gain', preset.graphicEQ[band])
      }
      switch (band) {
        case 'band62':
          setEq62(geq.band62)
          break
        case 'band125':
          setEq125(geq.band125)
          break
        case 'band250':
          setEq250(geq.band250)
          break
        case 'band500':
          setEq500(geq.band500)
          break
        case 'band1000':
          setEq1000(geq.band1000)
          break
        case 'band2000':
          setEq2000(geq.band2000)
          break
        case 'band4000':
          setEq4000(geq.band4000)
          break
        case 'band8000':
          setEq8000(geq.band8000)
          break
        default:
          continue
      }
    }
  }, [preset, eq, geq])

  const setEq = (e, band, onChange) => {
    const level = e.target.value
    eq.setValue(band, 'gain', level)

    onChange(level)
  }

  return (
    <div className='rack'>
      <Range name='62.5 Hz' min='-12' max='12' value={eq62} onChange={(e) => setEq(e, 'band62', setEq62)} />
      <Range name='125 Hz' min='-12' max='12' value={eq125} onChange={(e) => setEq(e, 'band125', setEq125)} />
      <Range name='250 Hz' min='-12' max='12' value={eq250} onChange={(e) => setEq(e, 'band250', setEq250)} />
      <Range name='500 Hz' min='-12' max='12' value={eq500} onChange={(e) => setEq(e, 'band500', setEq500)} />
      <Range name='1000 Hz' min='-12' max='12' value={eq1000} onChange={(e) => setEq(e, 'band1000', setEq1000)} />
      <Range name='2000 Hz' min='-12' max='12' value={eq2000} onChange={(e) => setEq(e, 'band2000', setEq2000)} />
      <Range name='4000 Hz' min='-12' max='12' value={eq4000} onChange={(e) => setEq(e, 'band4000', setEq4000)} />
      <Range name='8000 Hz' min='-12' max='12' value={eq8000} onChange={(e) => setEq(e, 'band8000', setEq8000)} />
    </div>
  );
}

export default InputEQ;