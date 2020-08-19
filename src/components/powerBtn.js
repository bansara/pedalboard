import React from 'react'
import { FiPower } from 'react-icons/fi'

const PowerBtn = ({ on, handlePower }) => {
  return (
    <div style={{ marginRight: '2em' }}>
      <button
        className='power'
        onClick={handlePower}
      >
        <FiPower
          color={on ? 'var(--green)' : 'var(--red)'}
          className='powerBtn'
        />
      </button>
    </div>
  )
}

export default PowerBtn