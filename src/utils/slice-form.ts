import type { FormSchema, SliceForm } from '../types';

const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result as string);
  });
};

export const getSliceForm = async (data: FormSchema) => {
  const image = data.image[0];
  const base64 = await getBase64(image);

  return {
    ...data,
    image: {
      type: image.type,
      size: image.size,
      base64,
    },
  } as SliceForm;
};
