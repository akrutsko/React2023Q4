import { personsMock } from './personsMock';

export const personsResponse = {
  count: 82,
  next: 'https://swapi.dev/api/people/?page=2',
  previous: null,
  results: [...personsMock],
};
