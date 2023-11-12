import { http, HttpResponse } from 'msw';
import { personsResponse } from '../data/personsResponse';

export const handlers = [
  http.get('https://swapi.dev/api/people', () => {
    return HttpResponse.json(personsResponse);
  }),

  http.get('https://swapi.dev/api/people/1', () => {
    return HttpResponse.json(personsResponse.results[0]);
  }),

  http.get('https://swapi.dev/api/people/100', () => {
    setTimeout(() => HttpResponse.json(personsResponse.results[0]));
  }),

  http.get('https://swapi.dev/api/people/NaN', () => {
    return HttpResponse.error();
  }),
];
