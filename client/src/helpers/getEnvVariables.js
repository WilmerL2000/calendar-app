export const getEnvVariables = () => {
  import.meta.env;
  return {
    VITE_MODE: import.meta.VITE_MODE,
    VITE_API_URL: import.meta.VITE_API_URL,
  };
};
