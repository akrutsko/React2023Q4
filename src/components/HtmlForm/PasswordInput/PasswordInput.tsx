import type { ChangeEvent, InputHTMLAttributes, LegacyRef } from 'react';
import { forwardRef, useState } from 'react';
import { getPasswordStrength } from '../../../utils';

type Props = {
  error: string;
  label: string;
  meter?: boolean;
};
type PasswordProps = Props & InputHTMLAttributes<HTMLInputElement>;

function Password(
  { error, id, label, name, meter }: PasswordProps,
  ref: LegacyRef<HTMLInputElement>,
) {
  const [strength, setStrength] = useState(0);
  const handleMeter = (event: ChangeEvent<HTMLInputElement>) => {
    const strength = getPasswordStrength(event.target.value);
    setStrength(strength);
  };

  return (
    <fieldset name="password">
      <legend>{error}</legend>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type="password"
        ref={ref}
        defaultValue=""
        onChange={handleMeter}
      />
      {meter && (
        <meter
          min={0}
          max={85}
          low={35}
          high={65}
          optimum={85}
          value={strength}
        />
      )}
    </fieldset>
  );
}

const PasswordInput = forwardRef(Password);
export default PasswordInput;
