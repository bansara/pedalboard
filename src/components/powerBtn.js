import React from 'react'
import { IconButton } from '@chakra-ui/core'

const PowerBtn = ({ on, handlePower }) => {
  return (
    <IconButton
      size='sm'
      variant='outline'
      color={on ? 'var(--green)' : 'var(--red)'}
      borderColor={on ? 'var(--green)' : 'var(--red)'}
      icon={on ? 'sun' : 'close'}
      marginRight='2em'
      onClick={handlePower}
    />
  )
}

export default PowerBtn