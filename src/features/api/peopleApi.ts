import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { BASE_URL } from '../../constants/constants';
import { Data, Person, ResourcesType } from '../../interfaces/SWApi';

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  tagTypes: ['People'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + `/${ResourcesType.People}` }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getPeople: build.query<Data<Person>, string>({
      query: (searchParams) => `?${searchParams}`,
      providesTags: ['People'],
    }),
    getPerson: build.query<Person, string>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const {
  useGetPeopleQuery,
  useGetPersonQuery,
  util: { getRunningQueriesThunk },
} = peopleApi;

export const { getPeople, getPerson } = peopleApi.endpoints;
