import './HtmlForm.module.css';

import { useRef, type FormEvent } from 'react';
import CheckboxInput from './CheckboxInput/CheckboxInput';
import EmailInput from './EmailInput/EmailInput';
import FileInput from './FileInput/FileInput';
import ListInput from './ListInput/ListInput';
import NumberInput from './NumberInput/NumberInput';
import PasswordInput from './PasswordInput/PasswordInput';
import RadioInput from './RadioInput/RadioInput';
import TextInput from './TextInput/TextInput';

export default function HtmlForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef('');
  const countryRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const pwdConfirmRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(nameRef.current?.value);
    console.log(ageRef.current?.value);
    console.log(genderRef.current);
    console.log(countryRef.current?.value);
    console.log(fileRef.current?.value);
    console.log(emailRef.current?.value);
    console.log((fileRef.current?.files?.[0] as File).type);
    console.log((fileRef.current?.files?.[0] as File).size);
    console.log(pwdRef.current?.value);
    console.log(pwdConfirmRef.current?.value);
    console.log(consentRef.current?.checked);

    const reader = new FileReader();
    if (fileRef.current?.files?.[0]) {
      reader.readAsBinaryString(fileRef.current?.files?.[0]);
      reader.onload = function () {
        console.log('Result:', btoa(reader.result as string));
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  };

  return (
    <section>
      <h1>HtmlForm</h1>
      <form
        id="html-form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <TextInput
          id="name"
          name="name"
          label="Name:"
          error="Name is required."
          ref={nameRef}
        />
        <NumberInput id="age" name="age" label="Age:" error="" ref={ageRef} />
        <RadioInput
          input={[
            { id: 'male', label: 'Male', defaultValue: 'Male' },
            { id: 'female', label: 'Female', defaultValue: 'Female' },
          ]}
          name="gender"
          error=""
          gender={genderRef}
        />
        <ListInput
          id="country"
          name="country"
          label="Country:"
          error=""
          ref={countryRef}
        />
        <FileInput
          id="image"
          name="image"
          label="Image:"
          error=""
          ref={fileRef}
        />
        <EmailInput
          id="email"
          name="email"
          label="Email:"
          error=""
          ref={emailRef}
        />
        <PasswordInput
          id="pwd1"
          name="pwd1"
          label="Password:"
          error=""
          ref={pwdRef}
        />
        <PasswordInput
          id="pwd2"
          name="pwd2"
          label="Password Confirmed:"
          error=""
          ref={pwdConfirmRef}
        />
        <CheckboxInput
          id="consent"
          name="consent"
          label="I agree..."
          error=""
          ref={consentRef}
        />
        <button>Submit</button>
      </form>
    </section>
  );
}
