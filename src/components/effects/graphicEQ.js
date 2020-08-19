import React, { useState, useContext, useRef } from 'react'
import Pedalboard from '../pedalboardContextProvider'
import GraphicEQ from '../../utils/audioBlocks/graphicEQ'
import Range from '../range'

const InputEQ = () => {
  const { pb } = useContext(Pedalboard)
  const eq = useRef(pb.effects.find(fx => fx instanceof GraphicEQ));

  const [eq62, setEq62] = useState(0)
  const [eq125, setEq125] = useState(0)
  const [eq250, setEq250] = useState(0)
  const [eq500, setEq500] = useState(0)
  const [eq1000, setEq1000] = useState(0)
  const [eq2000, setEq2000] = useState(0)
  const [eq4000, setEq4000] = useState(0)
  const [eq8000, setEq8000] = useState(0)

  const setEq = (e, band, onChange) => {
    const level = e.target.value
    if (!eq.current) {
      eq.current = pb.input.find(fx => fx instanceof GraphicEQ)
    }
    eq.current.setValue(band, 'gain', level)
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