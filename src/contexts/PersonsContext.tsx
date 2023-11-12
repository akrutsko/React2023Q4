import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { Person } from '../interfaces/SWApi';

export const PersonsContext = createContext<Person[]>([]);
export const PersonsDispatchContext = createContext<Dispatch<
  SetStateAction<Person[]>
> | null>(null);

type Props = {
  children: ReactNode;
};

export default function PersonsProvider({ children }: Props) {
  const [persons, setPersons] = useState<Person[]>([]);

  return (
    <PersonsContext.Provider value={persons}>
      <PersonsDispatchContext.Provider value={setPersons}>
        {children}
      </PersonsDispatchContext.Provider>
    </PersonsContext.Provider>
  );
}
