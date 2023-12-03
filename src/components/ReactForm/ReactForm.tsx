import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { useActions } from '../../hooks/useActions';
import { selectCountries } from '../../store/slices/countriesSlice';
import { formSchema, type FormSchema } from '../../types';
import { getPasswordStrength, getSliceForm } from '../../utils';
import Countries from '../Countries/Countries';
import { type ChangeEvent, useState } from 'react';

export default function ReactFrom() {
  const { addForm } = useActions();
  const navigate = useNavigate();

  const countries = useAppSelector(selectCountries);

  const form = useForm<FormSchema>({
    mode: 'all',
    resolver: yupResolver(formSchema),
  });
  const { register, handleSubmit, formState } = form;
  const { errors, isValid } = formState;

  const [strength, setStrength] = useState(0);
  const handleMeter = (event: ChangeEvent<HTMLInputElement>) => {
    const strength = getPasswordStrength(event.target.value);
    setStrength(strength);
  };

  const onSubmit = async (data: FormSchema) => {
    const sliceForm = await getSliceForm(data);
    addForm(sliceForm);
    navigate('/');
  };

  return (
    <section>
      <h1>ReactForm</h1>
      <form id="react-form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>{errors.name?.message}</legend>
          <label htmlFor="n">Name:</label>
          <input id="n" type="text" {...register('name')} />
        </fieldset>

        <fieldset>
          <legend>{errors.age?.message}</legend>
          <label htmlFor="a">Age:</label>
          <input id="a" type="number" {...register('age')} />
        </fieldset>

        <fieldset name="radio">
          <legend>{errors.gender?.message}</legend>
          <input id="m" type="radio" value="Male" {...register('gender')} />
          <label htmlFor="m">Male</label>
          <input id="f" type="radio" value="Female" {...register('gender')} />
          <label htmlFor="f">Female</label>
        </fieldset>

        <fieldset>
          <legend>{errors.country?.message}</legend>
          <label htmlFor="c">Country:</label>
          <input id="c" type="text" list="countries" {...register('country')} />
        </fieldset>
        <Countries id="countries" countries={countries} />

        <fieldset name="file">
          <legend>{errors.image?.message}</legend>
          <label htmlFor="i">Image:</label>
          <input id="i" type="file" {...register('image')} />
        </fieldset>

        <fieldset>
          <legend>{errors.email?.message}</legend>
          <label htmlFor="e">Email:</label>
          <input id="e" type="email" {...register('email')} />
        </fieldset>

        <fieldset name="password">
          <legend>{errors.password?.message}</legend>
          <label htmlFor="p1">Password:</label>
          <input
            id="p1"
            type="password"
            {...register('password')}
            onChange={handleMeter}
          />
          <meter
            min={0}
            max={85}
            low={35}
            high={65}
            optimum={85}
            value={strength}
          />
        </fieldset>

        <fieldset>
          <legend>{errors.confirmPassword?.message}</legend>
          <label htmlFor="p2">Password Confirmed:</label>
          <input id="p2" type="password" {...register('confirmPassword')} />
        </fieldset>

        <fieldset name="checkbox">
          <legend>{errors.consent?.message}</legend>
          <input id="cb" type="checkbox" {...register('consent')} />
          <label htmlFor="cb">I accept the terms and conditions</label>
        </fieldset>

        <button disabled={!isValid}>Submit</button>
      </form>
    </section>
  );
}
