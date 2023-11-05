import { Data, Person, ResourcesType } from '../interfaces/SWApi';

const URL = `https://swapi.dev/api/${ResourcesType.People}/`;

export const fetchPeople = async (
  search: string,
  page: number,
  options: RequestInit = {},
): Promise<Data<Person>> => {
  const searchParams = new URLSearchParams();
  search && searchParams.append('search', search);
  page && searchParams.append('page', page.toString());

  const res = await fetch(URL + '?' + searchParams, options);
  if (!res.ok) {
    throw new Error();
  }

  return res.json();
};

export const fetchPerson = async (
  id: number,
  options: RequestInit = {},
): Promise<Person> => {
  const res = await fetch(URL + id, options);
  if (!res.ok) {
    throw new Error();
  }
  return res.json();
};
