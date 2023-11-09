import { useContext } from 'react';
import { PersonsDispatchContext } from '../contexts/PersonsContext';

export function usePersonsDispatch() {
  const setPersons = useContext(PersonsDispatchContext);

  if (!setPersons) {
    throw new Error(
      'setPersons has to be used within <PersonsDispatchContext.Provider>',
    );
  }
  return setPersons;
}
