import type { WebForm } from './form';

export type SliceForm = Omit<WebForm, 'image'> & {
  image: {
    type: string;
    size: number;
    base64: string;
  };
  createdAt: ReturnType<typeof Date.now>;
};
