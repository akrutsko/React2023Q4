import { useEffect, useState, type InputHTMLAttributes } from 'react';
import { useWatch, type Control, type UseFormRegister } from 'react-hook-form';
import type { FormSchema } from '../../../types';
import { getPasswordStrength } from '../../../utils';

type Props = {
  id: string;
  name: keyof FormSchema;
  error: string | undefined;
  label: string;
  register: UseFormRegister<FormSchema>;
  control: Control<FormSchema>;
};
type PasswordProps = Props & InputHTMLAttributes<HTMLInputElement>;

export default function PassWithMeterRH({
  type,
  id,
  name,
  error,
  label,
  register,
  control,
}: PasswordProps) {
  const [strength, setStrength] = useState(0);
  const pass = useWatch<FormSchema>({ control, name });
  useEffect(() => {
    setStrength(getPasswordStrength((pass as string) || ''));
  }, [pass]);

  return (
    <fieldset name={type}>
      <legend>{error}</legend>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} {...register(name)} />
      <meter
        min={0}
        max={85}
        low={35}
        high={65}
        optimum={85}
        value={strength}
      />
    </fieldset>
  );
}
