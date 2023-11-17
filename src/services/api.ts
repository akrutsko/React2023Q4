import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/constants';
import { Data, Person, ResourcesType } from '../interfaces/SWApi';

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getPeople: build.query<Data<Person>, string>({
      query: (searchParams) =>
        `/${ResourcesType.People}` + (searchParams ? `?${searchParams}` : ''),
    }),
    getPerson: build.query<Person, string>({
      query: (id) => `/${ResourcesType.People}/${id}`,
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonQuery } = peopleApi;
