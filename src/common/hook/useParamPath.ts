export default function useParamPath() {
  const replaceParamPath = (path: string, params: Record<string, string>) => {
    return Object.keys(params).reduce((acc, key) => {
      return acc.replace(`:${key}`, params[key]);
    }, path);
  };

  return {
    replaceParamPath,
  };
}
