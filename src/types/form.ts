export type Form = {
  name: string;
  age: number;
  gender: string;
  country: string;
  imageType: string;
  imageSize: number;
  imageBase64: string;
  email: string;
  password: string;
  confirmPassword: string;
  consent: boolean;
  createdAt: ReturnType<typeof Date.now>;
};
