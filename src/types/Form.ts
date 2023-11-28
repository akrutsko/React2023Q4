export type Form = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  consent: boolean;
  image: InstanceType<typeof Blob>;
  country: string;
  createdAt: ReturnType<typeof Date.now>;
};
