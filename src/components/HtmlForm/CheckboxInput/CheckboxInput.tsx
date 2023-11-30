import type { InputHTMLAttributes, LegacyRef } from 'react';
import { forwardRef } from 'react';

type Props = {
  error: string;
  label: string;
};
type CheckboxProps = Props & InputHTMLAttributes<HTMLInputElement>;

function Checkbox(
  { id, name, label, error }: CheckboxProps,
  ref: LegacyRef<HTMLInputElement>,
) {
  return (
    <fieldset name="checkbox">
      <legend>{error}</legend>
      <input
        id={id}
        name={name}
        type="checkbox"
        ref={ref}
        defaultChecked={false}
      />
      <label htmlFor="consent">{label}</label>
    </fieldset>
  );
}

const CheckboxInput = forwardRef(Checkbox);
export default CheckboxInput;
