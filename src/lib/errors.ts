// 403エラー時に投げる専用エラークラス
export class InvalidApiKeyError extends Error {
  constructor(message = "Invalid API key") {
    super(message);
    this.name = "InvalidApiKeyError";
  }
}
