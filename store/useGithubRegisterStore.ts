import { create } from "zustand";
import { StateStatus } from "../types/common/StateStatus.type";
import { post } from "../common/axios";
import { ResponseStatus } from "../types/api/RestTemplate.type";
import { JwtTokenUtils } from "../utils/JwtTokenUtils";

type GithubRegisterStore = {
  status: StateStatus;
  error: null | string;
  register: (code: string) => Promise<void>;
};

export const useGithubRegisterStore = create<GithubRegisterStore>((set) => {
  return {
    status: StateStatus.INITIAL,
    error: null,
    register: async (code: string) => {
      set({ status: StateStatus.PENDING });
      const accessToken = JwtTokenUtils.getToken();

      if (!accessToken) {
        set({
          status: StateStatus.FAILURE,
        });
        return;
      }

      const res = await post<null, void>(
        `/auth/github/register?code=${code}`,
        null,
        accessToken
      );
      if (res.status === ResponseStatus.OK) {
        set({
          status: StateStatus.SUCCESS,
        });
      } else {
        const error = res.message;
        set({ error, status: StateStatus.FAILURE });
      }
    },
  };
});
