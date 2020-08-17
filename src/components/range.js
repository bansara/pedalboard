import React from 'react';
import { Text, Flex } from '@chakra-ui/core'

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
      {/* <Flex
      > */}
      {/* </Flex> */}
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
      <Text size='sm' w='4em' h='1.5em' bg='var(--dark)'>{Number(value).toFixed(2)}</Text>
      <Text size='xs' w='100%' h='1.5em'>{name}</Text>
    </Flex>
  );
}

export default Range;