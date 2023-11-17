import { BASE_URL } from '../constants/constants';
import { Person, ResourcesType } from '../interfaces/SWApi';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fetchPerson = async (
  id: number,
  options: RequestInit = {},
): Promise<Person> => {
  const res = await fetch(BASE_URL + id, options);
  if (!res.ok) {
    throw new Error();
  }
  return res.json();
};

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getPeople: build.query({
      query: (searchParams: string) => {
        console.log('API searchParams:', searchParams);
        return (
          `/${ResourcesType.People}` +
          (searchParams ? `?${new URLSearchParams(searchParams)}` : '')
        );
      },
    }),
    getPerson: build.query({
      query: (id: number) => `/${ResourcesType.People}${id}`,
    }),
  }),
});

export const { useGetPeopleQuery } = peopleApi;
