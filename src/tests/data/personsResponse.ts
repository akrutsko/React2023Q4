import { personsData } from './personsData';

export const personsResponse = {
  count: 82,
  next: 'https://swapi.dev/api/people/?page=2',
  previous: null,
  results: [...personsData],
};
