import React from 'react';

import Button from 'shared/ui/Button';
import useConfirmVoting from './hooks/useConfirmVoting';

const ConfirmVoting: React.FC = () => {
  const { confirmVoting } = useConfirmVoting();

  return (
    <Button size="normal" theme="dark" onClick={confirmVoting}>
      Confirm voting
    </Button>
  );
};

export default ConfirmVoting;
