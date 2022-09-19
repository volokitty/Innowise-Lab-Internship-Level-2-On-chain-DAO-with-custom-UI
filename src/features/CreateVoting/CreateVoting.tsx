import React from 'react';
import Button from 'shared/ui/Button';

import useCreateVoting from './hooks/useCreateVoting';

import style from './CreateVoting.module.css';

const CreateVoting: React.FC = () => {
  const { onSubmit, register, handleSubmit, errors } = useCreateVoting();
  const { votingForm, votingTypes } = style;

  return (
    <form className={votingForm} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          Description
          <input type="text" {...register('description', { required: 'Should not be empty' })} />
        </label>
        <p>{errors?.description?.message?.toString()}</p>
      </div>

      <div>
        <label>
          Parameters
          <input
            type="text"
            placeholder="9 digits"
            {...register('parameters', {
              required: 'Required',
              validate: (value) => !Number.isNaN(+value) && value.length === 9,
            })}
          />
        </label>
        <p>{errors?.parameters?.message?.toString()}</p>
      </div>

      <div>
        <label>
          Time
          <input
            type="number"
            placeholder="Minutes"
            min={5}
            {...register('time', { required: 'At least 5 minutes', min: 5 })}
          />
        </label>
        <p>{errors?.time?.message?.toString()}</p>
      </div>

      <div>
        <label>
          Voting type
          <div className={votingTypes}>
            <label>
              NFT
              <input
                {...register('type', { required: 'Select voting type' })}
                type="radio"
                value="NFT"
                checked
              />
            </label>
            <label>
              DAOT
              <input {...register('type')} type="radio" value="DAOT" />
            </label>
          </div>
        </label>
        <p>{errors?.type?.message?.toString()}</p>
      </div>
      <Button type="submit" size="normal" theme="dark">
        Create voting
      </Button>
    </form>
  );
};

export default CreateVoting;
