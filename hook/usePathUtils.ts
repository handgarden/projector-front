export default function usePathUtils() {
  const replaceParamPath = (path: string, params: Record<string, string>) => {
    return Object.keys(params).reduce((acc, key) => {
      return acc.replace(`:${key}`, params[key]);
    }, path);
  };

  const createRedirectPath = (path: string, params: Record<string, string>) => {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      searchParams.append(key, params[key]);
    });
    return `${path}?${searchParams.toString()}`;
  };

  return {
    replaceParamPath,
    createRedirectPath,
  };
}
