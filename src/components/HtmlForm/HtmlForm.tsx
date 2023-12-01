import './HtmlForm.module.css';

import { useRef, useState, type FormEvent } from 'react';
import { ValidationError } from 'yup';
import { formSchema } from '../../types/schema';
import type { Validation } from '../../types/validation';
import CheckboxInput from './CheckboxInput/CheckboxInput';
import EmailInput from './EmailInput/EmailInput';
import FileInput from './FileInput/FileInput';
import ListInput from './ListInput/ListInput';
import NumberInput from './NumberInput/NumberInput';
import PasswordInput from './PasswordInput/PasswordInput';
import RadioInput from './RadioInput/RadioInput';
import TextInput from './TextInput/TextInput';
import { validationErrors } from '../../assets/constants';
import { getBase64 } from '../../utils/image-base64';
import type { Form } from '../../types/form';
import { useActions } from '../../hooks/useActions';
import { useNavigate } from 'react-router-dom';

export default function HtmlForm() {
  const [errors, setErrors] = useState<Validation>(validationErrors);
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
      imageType: (fileRef.current?.files?.[0] as File)?.type,
      imageSize: (fileRef.current?.files?.[0] as File)?.size,
      imageBase64: '',
      email: emailRef.current?.value,
      password: pwdRef.current?.value,
      confirmPassword: pwdConfirmRef.current?.value,
      consent: consentRef.current?.checked,
    };

    try {
      await formSchema.validate(form, { abortEarly: false });
      const file = fileRef.current?.files?.[0];
      form.imageBase64 = await getBase64(file!);
      addForm(form as unknown as Form);
      navigate('/');
    } catch (err) {
      if (err instanceof ValidationError) {
        err.inner.reverse().forEach((err) => {
          const path = err.path as keyof Validation;
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
          error={errors.imageType || errors.imageSize}
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
          id="pwd1"
          name="pwd1"
          label="Password:"
          error={errors.password}
          ref={pwdRef}
        />
        <PasswordInput
          id="pwd2"
          name="pwd2"
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
