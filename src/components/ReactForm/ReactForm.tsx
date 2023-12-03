import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { useActions } from '../../hooks/useActions';
import { selectCountries } from '../../store/slices/countriesSlice';
import { formSchema, type FormSchema } from '../../types';
import { getSliceForm } from '../../utils';
import Countries from '../Countries/Countries';
import InputRH from './InputRH/InputRH';
import PassWithMeterRH from './PassWithMeterRH/PassWithMeterRH';
import RadioRH from './RadioRH/RadioRH';

export default function ReactFrom() {
  const { addForm } = useActions();
  const navigate = useNavigate();

  const countries = useAppSelector(selectCountries);

  const form = useForm<FormSchema>({
    mode: 'all',
    resolver: yupResolver(formSchema),
  });
  const { control, register, handleSubmit, formState } = form;
  const { errors, isValid } = formState;

  const onSubmit = async (data: FormSchema) => {
    const sliceForm = await getSliceForm(data);
    addForm(sliceForm);
    navigate('/');
  };

  return (
    <section>
      <h1>ReactForm</h1>
      <form id="react-form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <InputRH
          type="text"
          label="Name:"
          id="n"
          name="name"
          error={errors.name?.message}
          register={register}
        />
        <InputRH
          type="number"
          label="Age:"
          id="a"
          name="age"
          error={errors.age?.message}
          register={register}
        />
        <RadioRH
          input={[
            { id: 'male', label: 'Male' },
            { id: 'female', label: 'Female' },
          ]}
          name="gender"
          error={errors.gender?.message}
          register={register}
        />
        <InputRH
          type="text"
          label="Country:"
          id="c"
          list="countries"
          name="country"
          error={errors.country?.message}
          register={register}
        />
        <Countries id="countries" countries={countries} />
        <InputRH
          type="file"
          id="i"
          name="image"
          label="Image:"
          error={errors.image?.message}
          register={register}
        />
        <InputRH
          type="email"
          id="e"
          name="email"
          label="Email:"
          error={errors.email?.message}
          register={register}
        />
        <PassWithMeterRH
          type="password"
          id="p1"
          name="password"
          label="Password:"
          error={errors.password?.message}
          register={register}
          control={control}
        />
        <InputRH
          type="password"
          id="p2"
          name="confirmPassword"
          label="Confirm Password:"
          error={errors.confirmPassword?.message}
          register={register}
        />
        <InputRH
          type="checkbox"
          id="cb"
          name="consent"
          label="I accept the terms and conditions"
          error={errors.consent?.message}
          register={register}
        />
        <button disabled={!isValid}>Submit</button>
      </form>
    </section>
  );
}
