const PATH_PREFIX = "/auth";

export const AUTH_PATH = {
  login: `${PATH_PREFIX}/login`,
  register: `${PATH_PREFIX}/register`,
} as const;
