import React, { useContext } from 'react'
import InputSelect from './inputSelect'
import InputMeter from './inputMeter'
import CtxState from './ctxState'
import Presets from './presets'
import Pedalboard from '../pedalboardContextProvider'

const StartContext = () => {
  const { pb, setPb } = useContext(Pedalboard)
  console.log('pb', pb)

  const handleSetup = () => {

    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(() => {
        navigator.mediaDevices.enumerateDevices()
          .then((devices) => {
            const inputDevices = devices.filter((d) => d.kind === 'audioinput')
            setPb({
              ...pb,
              input: {
                ...pb.input,
                inputDevices
              }
            })
          })
      })

  }

  return (
    <div className='rack' style={{ background: 'var(--black' }}>
      <div className='flexRow jSpBtw grow'>
        <button
          className='inputBtn'
          onClick={handleSetup}
        >
          Get Inputs
        </button>
        <InputSelect />
        <Presets />
        {/* <InputMeter /> */}
      </div>
      <div className='flexRow jSpBtw grow'>
        <CtxState />
        <button
          className='inputBtn'
          onClick={() => {
            pb.ctx.suspend()
            setPb({ ...pb })
          }}
        >
          Pause
        </button>
        <button
          className='inputBtn'
          onClick={() => {
            pb.ctx.resume()
              .then(() => { setPb({ ...pb }) })
          }}
        >
          Resume
        </button>
      </div>
    </div>
  )
}

export default StartContext