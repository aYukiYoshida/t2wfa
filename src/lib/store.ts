import {create} from "zustand";

import {
  getApiKeyFromCookie,
  setApiKeyToCookie,
  clearApiKeyCookie,
} from "@/lib/cookie";

export type AuthState = {
  apiKey: string; // 現在のAPIキー
  isApiKeyValid: boolean; // APIキーが有効かどうか（セッションのみ）
  setApiKey: (apiKey: string) => void; // APIキーを設定し、Cookieにも保存
  clearApiKey: () => void; // APIキーをクリアし、Cookieも削除
  setApiKeyValid: (isValid: boolean) => void; // APIキーの有効性を設定
};

export const useAuthStore = create<AuthState>((set) => {
  // 初期状態はCookieから取得
  const initialApiKey = getApiKeyFromCookie();
  return {
    apiKey: initialApiKey ?? "",
    isApiKeyValid: true, // 初期状態は有効と仮定（セッションのみ、リロードでリセット）
    setApiKey: (apiKey) => {
      setApiKeyToCookie(apiKey);
      set({apiKey, isApiKeyValid: true}); // APIキー設定時は有効にリセット
    },
    clearApiKey: () => {
      clearApiKeyCookie();
      set({apiKey: "", isApiKeyValid: true});
    },
    setApiKeyValid: (isValid) => set({isApiKeyValid: isValid}),
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
