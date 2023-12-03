import type { InputHTMLAttributes, LegacyRef } from 'react';
import { forwardRef } from 'react';

type Props = {
  error: string;
  label: string;
};
type TextProps = Props & InputHTMLAttributes<HTMLInputElement>;

function Text(
  { error, id, label, name }: TextProps,
  ref: LegacyRef<HTMLInputElement>,
) {
  return (
    <fieldset>
      <legend>{error}</legend>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} type="text" ref={ref} defaultValue="" />
    </fieldset>
  );
}

const TextInput = forwardRef(Text);
export default TextInput;
