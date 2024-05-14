export const JwtTokenUtils = {
  getToken: () => {
    return localStorage.getItem("accessToken");
  },
  setToken: (token: string) => {
    localStorage.setItem("accessToken", token);
  },
  removeToken: () => {
    localStorage.removeItem("accessToken");
  },
};
