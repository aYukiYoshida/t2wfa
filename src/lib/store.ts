import {create} from "zustand";

import {
  getTokenFromCookie,
  setTokenToCookie,
  clearTokenCookie,
} from "@/lib/cookie";

export type AuthState = {
  token: string | null; // 現在のトークン
  isTokenValid: boolean; // トークンが有効かどうか（セッションのみ）
  setToken: (token: string) => void; // トークンを設定し、Cookieにも保存
  clearToken: () => void; // トークンをクリアし、Cookieも削除
  setTokenValid: (isValid: boolean) => void; // トークンの有効性を設定
};

export const useAuthStore = create<AuthState>((set) => {
  // 初期状態はCookieから取得
  const initialToken = getTokenFromCookie();
  return {
    token: initialToken,
    isTokenValid: true, // 初期状態は有効と仮定（セッションのみ、リロードでリセット）
    setToken: (token) => {
      setTokenToCookie(token);
      set({token, isTokenValid: true}); // トークン設定時は有効にリセット
    },
    clearToken: () => {
      clearTokenCookie();
      set({token: null, isTokenValid: true});
    },
    setTokenValid: (isValid) => set({isTokenValid: isValid}),
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
