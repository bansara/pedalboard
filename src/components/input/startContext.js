import React, { useContext } from 'react'
import { InputSelect } from './index'
import CtxState from './ctxState'
import Presets from './presets'
import Pedalboard from '../pedalboardContextProvider'

const StartContext = () => {
  const { pb, setPb } = useContext(Pedalboard)
  console.log('pb', pb)
  const handleSetup = () => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
              console.log(devices)
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
        .catch(e => {
          console.log(e)
          throw e
        })
    }

  }

  return (
    <div className='rack jSpBtw' style={{ background: 'var(--black)', padding: '0 ' }}>
      <div className='flexRow aCenter'>
        <button
          className='inputBtn'
          onClick={handleSetup}
        >
          Scan Inputs
        </button>
        <InputSelect />
      </div>
      <div>
        <Presets />
      </div>
      <div className='flexRow jEnd aCenter'>
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