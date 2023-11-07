import { useContext } from 'react';
import { PersonsContext } from '../contexts/PersonsContext';

export function usePerons() {
  return useContext(PersonsContext);
}
