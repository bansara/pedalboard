import React from 'react';
import { Flex } from '@chakra-ui/core'

const Range = ({ onChange, value, min, max, name }) => {
  return (
    <Flex
      h='100px'
      textAlign='center'
      direction='column'
      justify='space-around'
      align='center'
      color='var(--blue)'
    >
      <input
        type='range'
        min={min}
        max={max}
        value={value}
        step={max && max / 100}
        onChange={onChange}
        style={{ width: '4em' }}
      // className='vertical'
      />
      <p className='label'>{Number(value).toFixed(2)}</p>
      <p className='label'>{name}</p>
    </Flex>
  );
}

export default Range;