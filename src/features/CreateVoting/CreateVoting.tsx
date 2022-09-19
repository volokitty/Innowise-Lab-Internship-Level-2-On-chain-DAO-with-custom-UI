import React from 'react';
import Button from 'shared/ui/Button';
import Input from 'shared/ui/Input';

import useCreateVoting from './hooks/useCreateVoting';

import style from './CreateVoting.module.css';
import SegmentedDigitInput from 'shared/ui/SegmentedDigitInput';
import LabelCaption from 'shared/ui/LabelCaption';

const CreateVoting: React.FC = () => {
  const {
    errors,
    onSubmit,
    onDescriptionChange,
    onTimeChange,
    onParametersChange,
    onVotingTypeChange,
    currentNFTParameters,
  } = useCreateVoting();
  const { votingForm, votingTypes } = style;

  return (
    <>
      <LabelCaption
        theme="dark"
        size="normal"
        label="Current parameters"
        caption={currentNFTParameters}
      />
      <form className={votingForm} onSubmit={onSubmit}>
        <div>
          <label>
            Description
            <Input elementSize="normal" onChange={onDescriptionChange} />
          </label>
          <p>{errors.description}</p>
        </div>
        <div>
          <label>
            Parameters
            <SegmentedDigitInput onDigitsChange={onParametersChange} length={9} />
          </label>
          <p>{errors.parameters}</p>
        </div>
        <div>
          <label>
            Time
            <Input
              type="number"
              min={5}
              defaultValue={5}
              elementSize="normal"
              onChange={onTimeChange}
            />
          </label>
          <p>{errors.time}</p>
        </div>
        <div>
          <label>
            Voting type
            <div className={votingTypes}>
              <label>
                DAOT
                <input
                  name="votingType"
                  type="radio"
                  onChange={() => onVotingTypeChange(0)}
                  defaultChecked
                />
              </label>
              <label>
                NFT
                <input name="votingType" type="radio" onChange={() => onVotingTypeChange(1)} />
              </label>
            </div>
          </label>
        </div>
        <Button type="submit" size="normal" theme="dark">
          Create voting
        </Button>
      </form>
    </>
  );
};

export default CreateVoting;
