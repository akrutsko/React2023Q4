import countries from '../data/countries.json';

export const getContryNames = () => countries.map((country) => country.name);
