import React from 'react';
import Button from 'shared/ui/Button';
import Input from 'shared/ui/Input';
import LabelCaption from 'shared/ui/LabelCaption';

import useVote from './hooks/useVote';

import style from './Vote.module.css';

const Vote: React.FC = () => {
  const { vote, buttons } = style;
  const {
    description,
    lastVotingParameters,
    onAmountChange,
    votePositive,
    voteNegative,
    votingType,
    voted,
    canVote,
  } = useVote();

  return (
    <div className={vote}>
      <LabelCaption
        theme="dark"
        size="normal"
        label="Change to this"
        caption={lastVotingParameters.join(',')}
      />
      <LabelCaption theme="dark" size="normal" label="Description" caption={description} />
      <LabelCaption theme="dark" size="normal" label="Voting type" caption={votingType ?? ''} />
      {!voted && votingType === 'DAOT' && (
        <label>
          DAOT amount
          <Input
            onChange={onAmountChange}
            type="number"
            min={1}
            defaultValue={1}
            elementSize="normal"
          />
        </label>
      )}
      {canVote ? (
        voted ? (
          <span>You can not vote again</span>
        ) : (
          <div className={buttons}>
            <Button onClick={votePositive} size="normal" theme="dark">
              Yes
            </Button>
            <Button onClick={voteNegative} size="normal" theme="dark">
              No
            </Button>
          </div>
        )
      ) : (
        <span>You can not vote. Claim NFT first</span>
      )}
    </div>
  );
};

export default Vote;
