import type { InputHTMLAttributes, LegacyRef } from 'react';
import { forwardRef } from 'react';

type Props = {
  error: string;
  label: string;
};
type PasswordProps = Props & InputHTMLAttributes<HTMLInputElement>;

function Password(
  { error, id, label, name }: PasswordProps,
  ref: LegacyRef<HTMLInputElement>,
) {
  return (
    <fieldset>
      <legend>{error}</legend>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} type="password" ref={ref} defaultValue="" />
    </fieldset>
  );
}

const PasswordInput = forwardRef(Password);
export default PasswordInput;
