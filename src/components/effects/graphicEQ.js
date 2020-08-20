import React, { useContext, useState, useEffect, useCallback } from 'react'
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

  const setEq = useCallback((level, band, onChange) => {
    eq.setValue(band, 'gain', level)
    onChange(level)
  }, [eq])

  useEffect(() => {
    for (let band in preset.graphicEQ) {
      switch (band) {
        case 'band62':
          setEq(geq.band62, band, setEq62)
          break
        case 'band125':
          setEq(geq.band125, band, setEq125)
          break
        case 'band250':
          setEq(geq.band250, band, setEq250)
          break
        case 'band500':
          setEq(geq.band500, band, setEq500)
          break
        case 'band1000':
          setEq(geq.band1000, band, setEq1000)
          break
        case 'band2000':
          setEq(geq.band2000, band, setEq2000)
          break
        case 'band4000':
          setEq(geq.band4000, band, setEq4000)
          break
        case 'band8000':
          setEq(geq.band8000, band, setEq8000)
          break
        default:
          continue
      }
    }
  }, [preset, eq, geq, setEq])

  return (
    <div className='rack'>
      <Range name='62.5 Hz' min='-12' max='12' value={eq62} onChange={(e) => setEq(e.target.value, 'band62', setEq62)} />
      <Range name='125 Hz' min='-12' max='12' value={eq125} onChange={(e) => setEq(e.target.value, 'band125', setEq125)} />
      <Range name='250 Hz' min='-12' max='12' value={eq250} onChange={(e) => setEq(e.target.value, 'band250', setEq250)} />
      <Range name='500 Hz' min='-12' max='12' value={eq500} onChange={(e) => setEq(e.target.value, 'band500', setEq500)} />
      <Range name='1000 Hz' min='-12' max='12' value={eq1000} onChange={(e) => setEq(e.target.value, 'band1000', setEq1000)} />
      <Range name='2000 Hz' min='-12' max='12' value={eq2000} onChange={(e) => setEq(e.target.value, 'band2000', setEq2000)} />
      <Range name='4000 Hz' min='-12' max='12' value={eq4000} onChange={(e) => setEq(e.target.value, 'band4000', setEq4000)} />
      <Range name='8000 Hz' min='-12' max='12' value={eq8000} onChange={(e) => setEq(e.target.value, 'band8000', setEq8000)} />
    </div>
  );
}

export default InputEQ;