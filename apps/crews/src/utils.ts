const MAX_LENGTH = 10;
export const generateId = (prefix: string): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < MAX_LENGTH; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return prefix + "_" + result;
};

export const injectParameters = (template: string, params: Record<string, any>): string => {
  return template.replace(/\{(\w+)\}/g, (placeholder, key) => {
    if (key in params) {
      return params[key];
    } else {
      throw new Error(`Missing parameter for key: ${key}`);
    }
  });
};
