import { useRef, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';
import { validationErrors } from '../../assets/constants';
import { useActions } from '../../hooks/useActions';
import { type WebForm, type FormSchema, formSchema } from '../../types';
import { getSliceForm } from '../../utils';
import CheckboxInput from './CheckboxInput/CheckboxInput';
import EmailInput from './EmailInput/EmailInput';
import FileInput from './FileInput/FileInput';
import ListInput from './ListInput/ListInput';
import NumberInput from './NumberInput/NumberInput';
import PasswordInput from './PasswordInput/PasswordInput';
import RadioInput from './RadioInput/RadioInput';
import TextInput from './TextInput/TextInput';

export default function HtmlForm() {
  const [errors, setErrors] = useState(validationErrors);
  const { addForm } = useActions();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef('');
  const countryRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const pwdConfirmRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrors(validationErrors);

    const form = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      gender: genderRef.current,
      country: countryRef.current?.value,
      image: fileRef.current?.files,
      email: emailRef.current?.value,
      password: pwdRef.current?.value,
      confirmPassword: pwdConfirmRef.current?.value,
      consent: consentRef.current?.checked,
    } as unknown as FormSchema;

    try {
      await formSchema.validate(form, { abortEarly: false });
      const sliceForm = await getSliceForm(form);
      addForm(sliceForm);
      navigate('/');
    } catch (err) {
      if (err instanceof ValidationError) {
        err.inner.reverse().forEach((err) => {
          const path = err.path as keyof WebForm;
          setErrors((errors) => ({
            ...errors,
            [path]: err.message,
          }));
        });
      }
    }
  };

  return (
    <section>
      <h1>HtmlForm</h1>
      <form id="html-form" noValidate onSubmit={handleSubmit}>
        <TextInput
          id="name"
          name="name"
          label="Name:"
          error={errors.name}
          ref={nameRef}
        />
        <NumberInput
          id="age"
          name="age"
          label="Age:"
          error={errors.age}
          ref={ageRef}
        />
        <RadioInput
          input={[
            { id: 'male', label: 'Male', defaultValue: 'Male' },
            { id: 'female', label: 'Female', defaultValue: 'Female' },
          ]}
          name="gender"
          error={errors.gender}
          gender={genderRef}
        />
        <ListInput
          id="country"
          name="country"
          label="Country:"
          error={errors.country}
          ref={countryRef}
        />
        <FileInput
          id="image"
          name="image"
          label="Image:"
          error={errors.image}
          ref={fileRef}
        />
        <EmailInput
          id="email"
          name="email"
          label="Email:"
          error={errors.email}
          ref={emailRef}
        />
        <PasswordInput
          id="password"
          name="password"
          label="Password:"
          error={errors.password}
          ref={pwdRef}
        />
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Password Confirmed:"
          error={errors.confirmPassword}
          ref={pwdConfirmRef}
        />
        <CheckboxInput
          id="consent"
          name="consent"
          label="I accept the terms and conditions"
          error={errors.consent}
          ref={consentRef}
        />
        <button>Submit</button>
      </form>
    </section>
  );
}
