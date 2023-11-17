import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/constants';
import { ResourcesType } from '../interfaces/SWApi';

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getPeople: build.query({
      query: (searchParams: string) =>
        `/${ResourcesType.People}` + (searchParams ? `?${searchParams}` : ''),
    }),
    getPerson: build.query({
      query: (id: string) => `/${ResourcesType.People}/${id}`,
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonQuery } = peopleApi;
