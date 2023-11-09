import { useContext } from 'react';
import { PersonsContext } from '../contexts/PersonsContext';

export function usePersons() {
  return useContext(PersonsContext);
}
