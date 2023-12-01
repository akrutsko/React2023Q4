export const getBase64 = async (file: File): Promise<string> => {
  return await new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result as string);
  });
};
