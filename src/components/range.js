import React from 'react';

const Range = ({ onChange, value, min, max, name }) => {
  return (
    <div className='flexColumn aCenter jSpBtw'
      style={{
        height: '90px',
        width: '115px',
        textAlign: 'center',
        margin: '0.5em'
      }}
    >
      <input
        type='range'
        min={min}
        max={max}
        value={value}
        step={max && max / 100}
        onChange={onChange}
        style={{ width: '4em' }}
      />
      <p className='labelLt'>{Number(value).toFixed(2)}</p>
      <p className='label sm'>{name}</p>
    </div>
  );
}

export default Range;