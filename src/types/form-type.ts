import type { Image } from './image-type';

export type Form = {
  name: string;
  age: number;
  gender: string;
  country: string;
  image: Image;
  email: string;
  password: string;
  confirmPassword: string;
  consent: boolean;
  createdAt: ReturnType<typeof Date.now>;
};
