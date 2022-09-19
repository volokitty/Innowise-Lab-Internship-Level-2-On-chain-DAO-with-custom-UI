import React, { useContext, useEffect, useState } from 'react';
import AlertContext from 'shared/context/Alert/AlertContext';
import BlockchainContext from 'shared/context/Blockchain/BlockchainContext';
import VotingContext from 'shared/context/Voting/VotingContext';

interface CreateVoting {
  onSubmit: (data: any) => void;
  errors: {
    description: string;
    parameters: string;
    time: string;
  };
  onDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onParametersChange: (parameters: number[]) => void;
  onVotingTypeChange: (votingType: 0 | 1) => void;
  currentNFTParameters: string;
}

const useCreateVoting = (): CreateVoting => {
  const [formData, setFormData] = useState({
    description: '',
    parameters: new Array(9).fill(0),
    time: 300,
    votingType: 0,
  });

  const [errors, setErrors] = useState({
    description: '',
    parameters: '',
    time: '',
  });

  const [currentNFTParameters, setCurrentNFTParameters] = useState('');

  const { spawnErrorAlert, spawnSuccessAlert } = useContext(AlertContext);
  const { contracts, account } = useContext(BlockchainContext);
  const { updateVotingEnded } = useContext(VotingContext);

  const daoContract = contracts?.dao;
  const nftContract = contracts?.nft;

  useEffect(() => {
    nftContract?.methods
      .getUniqueParameterValues()
      .call()
      .then((parameters: string) => setCurrentNFTParameters(parameters))
      .catch(({ message }: { message: string }) => spawnErrorAlert?.(message));
  }, []);

  const validateDescription = (): string => {
    if (formData.description.length === 0) {
      setErrors({ ...errors, description: "Can't be empty" });
      return "Can't be empty";
    }

    return '';
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setFormData({ ...formData, description: value });

    if (value.length === 0) {
      setErrors({ ...errors, description: "Can't be empty" });
      return;
    }

    setErrors({ ...errors, description: '' });
  };

  const validateTime = (): string => {
    if (formData.time < 5 || Number.isNaN(formData.time)) {
      setErrors({ ...errors, time: 'At least 5 minutes' });
      return 'At least 5 minutes';
    }

    return '';
  };

  const onTimeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.valueAsNumber;
    setFormData({ ...formData, time: value * 60 });

    if (value < 5 || Number.isNaN(value)) {
      setErrors({ ...errors, time: 'At least 5 minutes' });
      return;
    }

    setErrors({ ...errors, time: '' });
  };

  const validateParameters = (): string => {
    if (formData.parameters.length < 9) {
      setErrors({ ...errors, parameters: "Can't be less than 9" });
      return "Can't be less than 9";
    }

    return '';
  };

  const onParametersChange = (parameters: number[]): void => {
    setFormData({ ...formData, parameters });

    if (parameters.length < 9) {
      setErrors({ ...errors, parameters: "Can't be less than 9" });
      return;
    }

    setErrors({ ...errors, parameters: '' });
  };

  const onVotingTypeChange = (votingType: 0 | 1): void => {
    setFormData({ ...formData, votingType });
  };

  const onSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    const errors = [validateDescription(), validateParameters(), validateTime()];

    if (''.concat(...errors) === '') {
      const { description, parameters, time, votingType } = formData;
      daoContract?.methods
        .createVoting(description, parameters, time, votingType)
        .send({ from: account })
        .then(() => spawnSuccessAlert?.('Voting created'))
        .then(() => updateVotingEnded())
        .catch(({ message }: { message: string }) => spawnErrorAlert?.(message));
    }
  };

  return {
    onSubmit,
    errors,
    onDescriptionChange,
    onTimeChange,
    onParametersChange,
    onVotingTypeChange,
    currentNFTParameters,
  };
};

export default useCreateVoting;
