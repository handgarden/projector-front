import { create } from "zustand";
import { StateStatus } from "../types/common/StateStatus.type";
import { LoginRequest } from "../types/auth/LoginRequest.type";
import { post } from "../common/axios";
import { LoginResponse } from "../types/auth/LoginResponse.type";
import { ResponseStatus } from "../types/api/RestTemplate.type";

type AuthStore = {
  isLogin: boolean;
  status: StateStatus;
  error: null | string;
  tokenLogin: () => void;
  login: (req: LoginRequest, redirect: () => void) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: true,
  status: StateStatus.INITIAL,
  error: null,
  tokenLogin: async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      set({ status: StateStatus.FAILURE, isLogin: false });
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
      localStorage.removeItem("accessToken");
      set({ status: StateStatus.FAILURE, isLogin: false });
    }
  },
  login: async (req: LoginRequest, redirect: () => void) => {
    set({ status: StateStatus.PENDING });
    const res = await post<LoginRequest, LoginResponse | null>(
      "/auth/login",
      req
    );
    if (res.status === ResponseStatus.OK) {
      const loginRes = res.data as LoginResponse;
      localStorage.setItem("accessToken", loginRes.accessToken);
      set({
        status: StateStatus.SUCCESS,
        isLogin: true,
      });
      redirect();
      return;
    } else {
      const error = res.message;
      set({ error, status: StateStatus.FAILURE, isLogin: false });
    }
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    set({ isLogin: false, status: StateStatus.INITIAL });
  },
}));
