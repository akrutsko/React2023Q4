import type { InputHTMLAttributes, LegacyRef } from 'react';
import { forwardRef } from 'react';

type Props = {
  error: string;
  label: string;
};
type NumberProps = Props & InputHTMLAttributes<HTMLInputElement>;

function Text(
  { error, id, label, name }: NumberProps,
  ref: LegacyRef<HTMLInputElement>,
) {
  return (
    <fieldset>
      <legend>{error}</legend>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} type="number" ref={ref} defaultValue="" />
    </fieldset>
  );
}

const NumberInput = forwardRef(Text);
export default NumberInput;
