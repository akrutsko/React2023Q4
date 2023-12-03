import type { InputHTMLAttributes } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import type { FormSchema } from '../../../types';

type Props = {
  id: string;
  name: keyof FormSchema;
  error: string | undefined;
  label: string;
  register: UseFormRegister<FormSchema>;
};
type InputProps = Props & InputHTMLAttributes<HTMLInputElement>;

export default function InputRH({
  type,
  id,
  list,
  name,
  error,
  label,
  register,
}: InputProps) {
  const isCheckbox = type === 'checkbox';

  return (
    <fieldset name={type}>
      <legend>{error}</legend>
      {!isCheckbox && <label htmlFor={id}>{label}</label>}
      <input id={id} type={type} list={list} {...register(name)} />
      {isCheckbox && <label htmlFor={id}>{label}</label>}
    </fieldset>
  );
}
