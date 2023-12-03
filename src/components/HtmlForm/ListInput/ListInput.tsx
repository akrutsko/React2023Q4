import type { InputHTMLAttributes, LegacyRef } from 'react';
import { forwardRef } from 'react';
import { useAppSelector } from '../../../hooks/hooks';
import { selectCountries } from '../../../store/slices/countriesSlice';
import Countries from '../../Countries/Countries';

type Props = {
  error: string;
  label: string;
};
type TextProps = Props & InputHTMLAttributes<HTMLInputElement>;

function Text(
  { error, id, label, name }: TextProps,
  ref: LegacyRef<HTMLInputElement>,
) {
  const countries = useAppSelector(selectCountries);

  return (
    <>
      <fieldset>
        <legend>{error}</legend>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          name={name}
          type="text"
          list={`${id}${name}`}
          ref={ref}
          defaultValue=""
        />
      </fieldset>
      <Countries id={`${id}${name}`} countries={countries} />
    </>
  );
}

const TextInput = forwardRef(Text);
export default TextInput;
