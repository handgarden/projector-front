import { create } from "zustand";
import { StateStatus } from "../types/common/StateStatus.type";
import { LoginRequest } from "../types/auth/LoginRequest.type";
import { post } from "../common/axios";
import { LoginResponse } from "../types/auth/LoginResponse.type";
import { ResponseStatus } from "../types/api/RestTemplate.type";
import { JwtTokenUtils } from "../utils/JwtTokenUtils";

type AuthStore = {
  isLogin: boolean;
  status: StateStatus;
  error: null | string;
  tokenLogin: () => void;
  login: (req: LoginRequest, redirect: () => void) => Promise<void>;
  logout: () => void;
  githubLogin: (
    code: string,
    completeFunc: Function,
    errorFunc: Function
  ) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: false,
  status: StateStatus.INITIAL,
  error: null,
  tokenLogin: async () => {
    const accessToken = JwtTokenUtils.getToken();

    if (!accessToken) {
      set({
        isLogin: false,
      });
      return;
    }

    set({ status: StateStatus.PENDING });

    const res = await post<null, LoginResponse | null>(
      "/auth/access",
      null,
      accessToken
    );

    if (res.status === ResponseStatus.OK) {
      set({
        status: StateStatus.SUCCESS,
        isLogin: true,
      });
    } else {
      JwtTokenUtils.removeToken();
      set({ isLogin: false, status: StateStatus.INITIAL });
    }
  },
  login: async (req: LoginRequest, redirect: () => void) => {
    set({ status: StateStatus.PENDING });
    const res = await post<LoginRequest, LoginResponse | null>(
      "/auth/login",
      req
    );
    if (res.status === ResponseStatus.OK) {
      JwtTokenUtils.setToken((res.data as LoginResponse).accessToken);
      set({
        status: StateStatus.SUCCESS,
        isLogin: true,
      });
      redirect();
    } else {
      const error = res.message;
      set({ error, status: StateStatus.FAILURE, isLogin: false });
    }
  },
  logout: () => {
    JwtTokenUtils.removeToken();
    set({ isLogin: false, status: StateStatus.INITIAL });
  },
  githubLogin: async (
    code: string,
    completeFunc: Function,
    errorFunc: Function
  ) => {
    set({ status: StateStatus.PENDING });
    const res = await post<null, LoginResponse | null>(
      `/auth/github/login?code=${code}`,
      null
    );
    if (res.status === ResponseStatus.OK) {
      JwtTokenUtils.setToken((res.data as LoginResponse).accessToken);
      set({
        status: StateStatus.SUCCESS,
        isLogin: true,
      });
      completeFunc();
    } else {
      const error = res.message;
      alert(error);
      set({
        error: error,
        status: StateStatus.INITIAL,
        isLogin: false,
      });
      errorFunc();
    }
  },
}));
