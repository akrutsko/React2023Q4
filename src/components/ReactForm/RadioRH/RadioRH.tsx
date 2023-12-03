import { Fragment, type InputHTMLAttributes } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import type { FormSchema } from '../../../types';

type Props = {
  input: Array<{
    id: string;
    label: string;
  }>;
  name: keyof FormSchema;
  error: string | undefined;
  register: UseFormRegister<FormSchema>;
};
type RadioProps = Props & InputHTMLAttributes<HTMLInputElement>;

export default function RadioRH({ input, name, error, register }: RadioProps) {
  const inputs = input.map((input) => (
    <Fragment key={input.id}>
      <input id={input.id} type="radio" {...register(name)} />
      <label htmlFor={input.id}>{input.label}</label>
    </Fragment>
  ));

  return (
    <fieldset name="radio">
      <legend>{error}</legend>
      {inputs}
    </fieldset>
  );
}
