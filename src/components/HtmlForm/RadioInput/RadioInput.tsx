import {
  Fragment,
  type ChangeEvent,
  type InputHTMLAttributes,
  type MutableRefObject,
} from 'react';
import type { Input } from '../../../types/input';

type Props = {
  error: string;
  input: Input[];
  gender: MutableRefObject<string>;
};
type RadioProps = Props & InputHTMLAttributes<HTMLInputElement>;

export default function RadioInput({ input, name, error, gender }: RadioProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    gender.current = event.target.value;
  };

  const inputs = input.map((input) => (
    <Fragment key={input.id}>
      <input
        id={input.id}
        name={name}
        type="radio"
        defaultChecked={false}
        defaultValue={input.defaultValue}
        onChange={handleChange}
      />
      <label htmlFor="male">{input.label}</label>
    </Fragment>
  ));

  return (
    <fieldset name="radio">
      <legend>{error}</legend>
      {inputs}
    </fieldset>
  );
}
