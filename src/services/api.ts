import { Data, Person, ResourcesType } from '../interfaces/SWApi';

const URL = `https://swapi.dev/api/${ResourcesType.People}/`;

export const fetchPeople = (
  search: string,
  page: number,
  options: RequestInit = {},
): Promise<Data<Person>> => {
  const searchParams = new URLSearchParams();
  search && searchParams.append('search', search);
  page && searchParams.append('page', page.toString());

  return fetch(URL + '?' + searchParams, options).then((res) => res.json());
};
