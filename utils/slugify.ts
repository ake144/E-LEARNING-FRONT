// utils/slugify.js
export const slugify = (text: string) => {
    return text.toLowerCase().split(' ')[0];
  };
  