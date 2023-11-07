import { createContext } from 'react';
import { Person } from '../interfaces/SWApi';

export const PersonsContext = createContext<Person[]>([]);
