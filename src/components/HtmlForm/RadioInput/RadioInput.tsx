import {
  Fragment,
  type ChangeEvent,
  type InputHTMLAttributes,
  type MutableRefObject,
} from 'react';

type Props = {
  error: string;
  input: Array<{
    id: string;
    label: string;
    defaultValue: string;
  }>;
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
