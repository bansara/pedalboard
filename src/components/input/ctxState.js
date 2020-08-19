import React, { useContext } from 'react';
import Pedalboard from '../pedalboardContextProvider';

const CtxState = () => {
  const { pb } = useContext(Pedalboard);
  return (
    <div>
      {
        <p
          className={`label ${pb?.ctx?.state === 'running' ? 'green' : 'red'}`}
        >
          {pb?.ctx?.state || 'deactivated'}
        </p>
      }
    </div>
  );
}

export default CtxState;