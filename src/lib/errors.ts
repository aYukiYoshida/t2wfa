// 403エラー時に投げる専用エラークラス
export class InvalidApiKeyError extends Error {
  constructor(message = "Invalid API key") {
    super(message);
    this.name = "InvalidApiKeyError";
  }
}

// 429エラー時に投げる専用エラークラス
export class TooManyRequestsError extends Error {
  constructor(message = "Too many requests") {
    super(message);
    this.name = "TooManyRequestsError";
  }
}
