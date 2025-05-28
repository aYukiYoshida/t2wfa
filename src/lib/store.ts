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

export type DateState = {
  date: Date | undefined; // 現在の日付
  setDate: (date: Date | undefined) => void; // 日付を設定
};

export const useDateStore = create<DateState>((set) => ({
  date: undefined, // 初期状態は未設定
  setDate: (date) => set({date}), // 日付を設定する関数
}));
