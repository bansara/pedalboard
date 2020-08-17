import React, { useContext } from 'react';
import { Button } from '@chakra-ui/core';
import Pedalboard from './pedalboardContextProvider';
import setup from '../utils/initialSetup';

const StartContext = () => {
  const { pb, setPb } = useContext(Pedalboard)

  let signal, inputDevices

  const handleSetup = () => {
    if (!signal) {
      signal = setup()
      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(() => {
          navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
              inputDevices = devices.filter((d) => d.kind === 'audioinput')
              setPb({
                ...signal,
                input: {
                  ...signal.input,
                  inputDevices
                }
              })
            })
        })
    }
  }

  return (
    <div className='flexColumn' style={{ width: '100px' }}>
      <Button
        size='sm'
        variant='outline'
        color='var(--blue)'
        borderColor='var(--blue)'
        onClick={handleSetup}
      >
        Start Context
      </Button>
      <Button
        size='sm'
        variant='outline'
        color='var(--blue)'
        borderColor='var(--blue)'
        onClick={() => {
          pb.ctx.suspend();
          setPb({ ...pb })
        }}
      >
        Mute
      </Button>
      <Button
        size='sm'
        variant='outline'
        color='var(--blue)'
        borderColor='var(--blue)'
        onClick={() => {
          pb.ctx.resume()
            .then(() => { setPb({ ...pb }) })
        }}
      >
        Unmute
      </Button>
    </div>
  );
}

export default StartContext;