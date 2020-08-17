import React, { useContext } from 'react';
import { Text } from '@chakra-ui/core';
import Pedalboard from '../pedalboardContextProvider';

const CtxState = () => {
  const { pb } = useContext(Pedalboard);
  return (
    <div>
      {
        <Text
          fontSize="xs"
          color={pb?.ctx?.state === 'running' ? 'var(--green)' : 'var(--red)'}
        >
          {pb?.ctx?.state || 'deactivated'}
        </Text>
      }
    </div>
  );
}

export default CtxState;