import React from 'react'
import { FiPower } from 'react-icons/fi'

const PowerBtn = ({ on, handlePower, name }) => {
  return (
    <div className='flexColumn jCenter' style={{ marginRight: '2em', position: 'relative' }}>
      <h2
        className={on ? 'title enabled' : 'title bypassed'}
        onClick={handlePower}
      >
        {name}
      </h2>
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