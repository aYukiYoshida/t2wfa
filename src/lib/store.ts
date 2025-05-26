import {create} from "zustand";
import {
  getTokenFromCookie,
  setTokenToCookie,
  clearTokenCookie,
} from "@/lib/cookie";

export type AuthState = {
  token: string | null; // 現在のトークン
  setToken: (token: string) => void; // トークンを設定し、Cookieにも保存
  clearToken: () => void; // トークンをクリアし、Cookieも削除
};

export const useAuthStore = create<AuthState>((set) => {
  // 初期状態はCookieから取得
  const initialToken = getTokenFromCookie();
  return {
    token: initialToken,
    setToken: (token) => {
      setTokenToCookie(token);
      set({token});
    },
    clearToken: () => {
      clearTokenCookie();
      set({token: null});
    },
  };
});
