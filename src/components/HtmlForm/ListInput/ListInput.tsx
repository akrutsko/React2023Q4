import type { InputHTMLAttributes, LegacyRef } from 'react';
import { forwardRef } from 'react';
import { useAppSelector } from '../../../hooks/hooks';
import { selectCountries } from '../../../store/slices/countriesSlice';

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
  const options = countries.map((country) => (
    <option key={country.code} value={country.name}>
      {country.name}
    </option>
  ));

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
      <datalist id={`${id}${name}`}>{options}</datalist>
    </>
  );
}

const TextInput = forwardRef(Text);
export default TextInput;
