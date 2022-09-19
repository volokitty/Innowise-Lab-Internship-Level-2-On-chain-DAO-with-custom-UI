import { useEffect } from 'react';
import {
  FieldErrorsImpl,
  FieldValues,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

interface CreateVoting {
  onSubmit: (data: any) => void;
  errors: FieldErrorsImpl<{
    [x: string]: any;
  }>;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
}

const useCreateVoting = (): CreateVoting => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data: any): void => console.log(JSON.stringify(data));

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return { onSubmit, errors, register, handleSubmit };
};

export default useCreateVoting;
