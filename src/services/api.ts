import { Data, Person, ResourcesType } from '../interfaces/SWApi';

const URL = `https://swapi.dev/api/${ResourcesType.People}/`;

export const fetchPeople = (searchTerm: string = ''): Promise<Data<Person>> => {
  const searchParam = searchTerm && `?search=${searchTerm}`;
  return fetch(URL + searchParam).then((res) => res.json());
};
