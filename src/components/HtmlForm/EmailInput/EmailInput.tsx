import type { InputHTMLAttributes, LegacyRef } from 'react';
import { forwardRef } from 'react';

type Props = {
  error: string;
  label: string;
};
type EmailProps = Props & InputHTMLAttributes<HTMLInputElement>;

function Email(
  { id, name, label, error }: EmailProps,
  ref: LegacyRef<HTMLInputElement>,
) {
  return (
    <fieldset>
      <legend>{error}</legend>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} type="email" ref={ref} defaultValue="" />
    </fieldset>
  );
}

const EmailInput = forwardRef(Email);
export default EmailInput;
