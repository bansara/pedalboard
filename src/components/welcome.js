import React from 'react'
import setup from '../utils/initialSetup'


const Welcome = ({ setStarted, setPb }) => {
  return (
    <div className='welcome'>
      <div className='welcomeForm'>
        <h1>Pedalboard JS</h1>
        <h3>Pedalboard JS is designed for use with a guitar or line input.</h3>
        <p>Click <span className='blueLt'>'Scan Inputs'</span> then select your input source.</p>
        <p><span className='red'>If you choose your laptop mic,</span> be sure to <span className='red'>use headphones,</span> or it will <span className='red'>feedback!</span></p>
        <button
          className='agree'
          onClick={() => {
            setPb(setup())
            setStarted(true)
          }}
        >
          Rock and Roll
        </button>
        <button
          className='disagree'
          onClick={() => window.location = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
        >
          I live in fear
        </button>
      </div>
    </div>
  );
}

export default Welcome;