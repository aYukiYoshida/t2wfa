const TOKEN_COOKIE_NAME = "apod-token";

/**
 * Cookieオプションの型定義
 */
interface CookieOptions {
  path?: string; // Cookieが有効なパス（デフォルト: '/'）
  domain?: string; // Cookieが有効なドメイン
  secure?: boolean; // HTTPSでのみCookieを送信するか（デフォルト: true）
  sameSite?: "Strict" | "Lax" | "None"; // SameSite属性の設定（デフォルト: 'Strict'）
  maxAge?: number; // Cookieの有効期限（秒単位）
  expires?: Date; // Cookieの有効期限（Date型で指定可能）
}

/**
 * Retrieves the value of a specified cookie by its name.
 *
 * @returns Cookieの値 (見つからない場合は`null`)
 */
export const getTokenFromCookie = (): string | null => {
  const match = document.cookie.match(
    new RegExp(`(^| )${TOKEN_COOKIE_NAME}=([^;]+)`)
  );
  return match ? decodeURIComponent(match[2]) : null;
};

/**
 * セキュアなCookieを設定する関数
 * @param value - Cookieの値
 * @param options - Cookieのオプション
 */
export const setTokenToCookie = (
  value: string,
  options: CookieOptions = {}
): void => {
  const defaultOptions: CookieOptions = {
    path: "/",
    secure: true,
    sameSite: "Strict",
    maxAge: 3600, // in unit of seconds
  };

  // デフォルトオプションと引数で指定されたオプションをマージ
  const combinedOptions = {...defaultOptions, ...options};

  // Cookieのオプションを文字列形式に変換
  const cookieString =
    `${TOKEN_COOKIE_NAME}=${encodeURIComponent(value)};` +
    Object.entries(combinedOptions)
      .map(([key, val]) => {
        if (val === true) return key; // 値がtrueの場合、属性名だけを追加（例: 'Secure'）
        if (key === "expires" && val instanceof Date) {
          return `${key}=${val.toUTCString()}`; // expiresはUTC形式に変換
        }
        if (val !== undefined) return `${key}=${val}`; // 値が存在する場合のみ追加
        return "";
      })
      .filter(Boolean) // 空の要素を削除
      .join("; ");

  // Cookieを設定
  document.cookie = cookieString;
  console.log(`Cookie Set: ${cookieString}`);
};

export const clearTokenCookie = (): void => {
  setTokenToCookie("", {expires: new Date(0)}); // 過去の日付を設定してCookieを削除
  console.log(`Cookie Cleared: ${TOKEN_COOKIE_NAME}`);
};
