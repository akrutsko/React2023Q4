import type { InputHTMLAttributes, LegacyRef } from 'react';
import { forwardRef } from 'react';

type Props = {
  error: string;
  label: string;
};
type FileProps = Props & InputHTMLAttributes<HTMLInputElement>;

function File(
  { id, name, label, error }: FileProps,
  ref: LegacyRef<HTMLInputElement>,
) {
  return (
    <fieldset name="checkbox">
      <legend>{error}</legend>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} type="file" ref={ref} />
    </fieldset>
  );
}

const FileInput = forwardRef(File);
export default FileInput;
