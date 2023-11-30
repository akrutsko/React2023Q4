import type { Image } from './Image';

export type Form = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  consent: boolean;
  image: Image;
  country: string;
  createdAt: ReturnType<typeof Date.now>;
};
