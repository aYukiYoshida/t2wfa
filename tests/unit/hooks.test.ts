import {act, renderHook, waitFor} from "@testing-library/react";
import {describe, beforeEach, afterEach, it, vi} from "vitest";

import Api from "@/lib/api";
import {InvalidApiKeyError} from "@/lib/errors";
import Hooks from "@/lib/hooks";
import {useAuthStore, useDateStore} from "@/lib/store";

describe("Hooks.useFetchApodImage", () => {
  // テストスタブ(テスト対象への間接入力を操作するテストダブル)の定義
  // テスト対象である useFetchApodImage の間接入力を事前に設定して使用する
  // ここで useFetchApodImage の間接入力は内部で実行する getApodImage の戻り値である
  // ここでは getApodImage を差し替える戻り値を指定したテストスタブを定義する
  const arrangeGetApodImageSpy = () =>
    vi.spyOn(Api, "getApodImage").mockResolvedValue({
      title: "Einstein Ring Surrounds Nearby Galaxy Center",
      explanation: "explanation",
      copyright: "copyright",
      media_type: "image",
      hdurl:
        "https://apod.nasa.gov/apod/image/2502/ClusterRing_Euclid_2665.jpg",
      url: "https://apod.nasa.gov/apod/image/2502/ClusterRing_Euclid_960.jpg",
      service_version: "v1",
      date: "2025-02-26",
    });

  beforeEach(() => {
    // 日付ストアを未設定にリセット
    act(() => {
      useDateStore.setState({date: undefined});
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("画像データ取得", () => {
    describe("取得に成功した場合", () => {
      it("画像の情報が返る", async ({expect}) => {
        const getApodImageSpy = arrangeGetApodImageSpy();
        const {result} = renderHook(() => Hooks.useFetchApodImage());

        // 非同期処理の完了を待つ
        await waitFor(() => {
          expect(result.current.loading).not.toBeTruthy();
        });

        expect(getApodImageSpy).toHaveBeenCalledTimes(1);
        expect(getApodImageSpy).toHaveBeenCalledWith({
          apiKey: "DEMO_KEY",
          date: undefined,
        });
        expect(result.current.image).toEqual({
          copyright: "copyright",
          date: "2025-02-26",
          explanation: "explanation",
          hdurl:
            "https://apod.nasa.gov/apod/image/2502/ClusterRing_Euclid_2665.jpg",
          media_type: "image",
          service_version: "v1",
          title: "Einstein Ring Surrounds Nearby Galaxy Center",
          url: "https://apod.nasa.gov/apod/image/2502/ClusterRing_Euclid_960.jpg",
        });
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
      });
    });

    describe("取得に失敗した場合", () => {
      it("エラーが返る", async ({expect}) => {
        // テストスタブ(テスト対象への間接入力を操作するテストダブル)の定義
        // テスト対象である useFetchApodImage の間接入力を事前に設定して使用する
        // ここで useFetchApodImage の間接入力は内部で実行する getApodImage の戻り値である
        // ここでは getApodImage を差し替える戻り値を指定したテストスタブを定義する
        const getApodImageSpy = vi
          .spyOn(Api, "getApodImage")
          .mockImplementation(() => {
            throw new Error("API Error");
          });

        const {result} = renderHook(() => Hooks.useFetchApodImage());

        // 非同期処理の完了を待つ
        await waitFor(() => {
          expect(result.current.loading).not.toBeTruthy();
        });
        expect(getApodImageSpy).toHaveBeenCalledTimes(1);
        expect(result.current.image).toBe(undefined);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toEqual(new Error("API Error"));
      });
    });

    describe("取得に失敗した後に取得が成功した場合", () => {
      it("画像の情報が返る", async ({expect}) => {
        // テストスタブ(テスト対象への間接入力を操作するテストダブル)の定義
        // テスト対象である useFetchApodImage の間接入力を事前に設定して使用する
        // ここで useFetchApodImage の間接入力は内部で実行する getApodImage の戻り値である
        // ここでは getApodImage を差し替える戻り値を指定したテストスタブを定義する
        vi.spyOn(Api, "getApodImage")
          .mockImplementationOnce(() => {
            throw new Error("API Error");
          })
          .mockResolvedValue({
            title: "Einstein Ring Surrounds Nearby Galaxy Center",
            explanation: "explanation",
            copyright: "copyright",
            media_type: "image",
            hdurl:
              "https://apod.nasa.gov/apod/image/2502/ClusterRing_Euclid_2665.jpg",
            url: "https://apod.nasa.gov/apod/image/2502/ClusterRing_Euclid_960.jpg",
            service_version: "v1",
            date: "2025-02-26",
          });

        // 初回は失敗する
        const {result: resultFirst} = renderHook(() =>
          Hooks.useFetchApodImage()
        );

        // 非同期処理の完了を待つ
        await waitFor(() => {
          expect(resultFirst.current.loading).not.toBeTruthy();
        });
        expect(resultFirst.current.image).toBe(undefined);
        expect(resultFirst.current.loading).toBe(false);
        expect(resultFirst.current.error).toEqual(new Error("API Error"));

        // 再度フックを呼び出すと成功する
        const {result: resultSecond} = renderHook(() =>
          Hooks.useFetchApodImage()
        );

        // 非同期処理の完了を待つ
        await waitFor(() => {
          expect(resultFirst.current.loading).not.toBeTruthy();
        });
        expect(resultSecond.current.image).toEqual({
          copyright: "copyright",
          date: "2025-02-26",
          explanation: "explanation",
          hdurl:
            "https://apod.nasa.gov/apod/image/2502/ClusterRing_Euclid_2665.jpg",
          media_type: "image",
          service_version: "v1",
          title: "Einstein Ring Surrounds Nearby Galaxy Center",
          url: "https://apod.nasa.gov/apod/image/2502/ClusterRing_Euclid_960.jpg",
        });
        expect(resultSecond.current.loading).toBe(false);
        expect(resultSecond.current.error).toBeNull();
      });
    });

    describe("日付の選択", () => {
      it("選択した日付の画像の情報が取得される", async ({expect}) => {
        const getApodImageSpy = arrangeGetApodImageSpy();
        const date = new Date("2025-02-26");
        // 日付を選択
        act(() => {
          useDateStore.setState({date});
        });

        const {result} = renderHook(() => Hooks.useFetchApodImage());

        // 非同期処理の完了を待つ;
        await waitFor(() => {
          expect(result.current.image).not.toBeNull();
        });
        expect(getApodImageSpy).toHaveBeenCalledTimes(1);
        expect(getApodImageSpy).toHaveBeenCalledWith({
          apiKey: "DEMO_KEY",
          date,
        });
      });
    });
  });
});

describe("Hooks.useValidateApiKey", () => {
  beforeEach(() => {
    // 認証ストアを初期状態にリセット
    act(() => {
      useAuthStore.setState({apiKey: "", isApiKeyValid: true});
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("APIキーが未入力の場合", () => {
    it("検証がスキップされる", async ({expect}) => {
      const getApodImageSpy = vi.spyOn(Api, "getApodImage");

      act(() => {
        useAuthStore.setState({apiKey: "", isApiKeyValid: null});
      });

      const {result} = renderHook(() => Hooks.useValidateApiKey());

      expect(result.current.isValidating).toBe(false);
      expect(getApodImageSpy).not.toHaveBeenCalled();
    });
  });

  describe("APIキーが入力済", () => {
    describe("検証中の場合", () => {
      it("検証状態が検証中になる", async ({expect}) => {
        vi.spyOn(Api, "getApodImage").mockResolvedValue({
          title: "Test",
          explanation: "Test",
          copyright: "Test",
          media_type: "image",
          hdurl: "https://example.com/image.jpg",
          url: "https://example.com/image.jpg",
          service_version: "v1",
          date: "2025-02-26",
        });

        act(() => {
          useAuthStore.setState({apiKey: "test-api-key", isApiKeyValid: null});
        });

        const {result} = renderHook(() => Hooks.useValidateApiKey());

        // 初期状態では検証中
        expect(result.current.isValidating).toBe(true);

        // 非同期処理の完了を待つ
        await waitFor(() => {
          expect(result.current.isValidating).toBe(false);
        });
      });
    });

    describe("検証に成功した場合", () => {
      it("検証結果が成功と設定される", async ({expect}) => {
        const getApodImageSpy = vi
          .spyOn(Api, "getApodImage")
          .mockResolvedValue({
            title: "Test",
            explanation: "Test",
            copyright: "Test",
            media_type: "image",
            hdurl: "https://example.com/image.jpg",
            url: "https://example.com/image.jpg",
            service_version: "v1",
            date: "2025-02-26",
          });

        act(() => {
          useAuthStore.setState({apiKey: "valid-api-key", isApiKeyValid: null});
        });

        const {result} = renderHook(() => Hooks.useValidateApiKey());

        // 非同期処理の完了を待つ
        await waitFor(() => {
          expect(result.current.isValidating).toBe(false);
        });

        expect(getApodImageSpy).toHaveBeenCalledTimes(1);
        expect(useAuthStore.getState().isApiKeyValid).toBe(true);
      });
    });

    describe("検証に失敗した場合（InvalidApiKeyError）", () => {
      it("検証結果が失敗と設定される", async ({expect}) => {
        const getApodImageSpy = vi
          .spyOn(Api, "getApodImage")
          .mockRejectedValue(new InvalidApiKeyError());

        act(() => {
          useAuthStore.setState({
            apiKey: "invalid-api-key",
            isApiKeyValid: null,
          });
        });

        const {result} = renderHook(() => Hooks.useValidateApiKey());

        // 非同期処理の完了を待つ
        await waitFor(() => {
          expect(result.current.isValidating).toBe(false);
        });

        expect(getApodImageSpy).toHaveBeenCalledTimes(1);
        expect(useAuthStore.getState().isApiKeyValid).toBe(false);
      });
    });

    describe("その他のエラーが発生した場合", () => {
      it("検証結果が有効として扱われる", async ({expect}) => {
        const getApodImageSpy = vi
          .spyOn(Api, "getApodImage")
          .mockRejectedValue(new Error("Network Error"));

        act(() => {
          useAuthStore.setState({
            apiKey: "some-api-key",
            isApiKeyValid: null,
          });
        });

        const {result} = renderHook(() => Hooks.useValidateApiKey());

        // 非同期処理の完了を待つ
        await waitFor(() => {
          expect(result.current.isValidating).toBe(false);
        });

        expect(getApodImageSpy).toHaveBeenCalledTimes(1);
        expect(useAuthStore.getState().isApiKeyValid).toBe(true);
      });
    });
  });
});

describe("Hooks.useApiKeyInput", () => {
  beforeEach(() => {
    // 認証ストアを初期状態にリセット
    act(() => {
      useAuthStore.setState({apiKey: "", isApiKeyValid: true});
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("初期状態の場合", () => {
    it("未入力となる", ({expect}) => {
      const {result} = renderHook(() => Hooks.useApiKeyInput());

      expect(result.current.inputRef).toBeDefined();
      expect(result.current.inputRef.current).toBeNull();
    });

    it("未検証の状態になる", ({expect}) => {
      const {result} = renderHook(() => Hooks.useApiKeyInput());

      expect(result.current.isValidating).toBe(false);
    });

    it("エラーは設定されない", ({expect}) => {
      const {result} = renderHook(() => Hooks.useApiKeyInput());

      expect(result.current.error).toBeNull();
    });
  });

  describe("APIキー検証", () => {
    it("APIキーの検証時には検証中の状態になる", async ({expect}) => {
      vi.spyOn(Api, "getApodImage").mockResolvedValue({
        title: "Test",
        explanation: "Test",
        copyright: "Test",
        media_type: "image",
        hdurl: "https://example.com/image.jpg",
        url: "https://example.com/image.jpg",
        service_version: "v1",
        date: "2025-02-26",
      });

      act(() => {
        useAuthStore.setState({apiKey: "test-api-key", isApiKeyValid: null});
      });

      const {result} = renderHook(() => Hooks.useApiKeyInput());

      // 検証中はisValidatingがtrue
      expect(result.current.isValidating).toBe(true);

      // 非同期処理の完了を待つ
      await waitFor(() => {
        expect(result.current.isValidating).toBe(false);
      });
    });

    it("APIキーの検証に失敗した場合はエラーが設定される", async ({expect}) => {
      const testError = new InvalidApiKeyError();
      vi.spyOn(Api, "getApodImage").mockRejectedValue(testError);

      act(() => {
        useAuthStore.setState({apiKey: "invalid-key", isApiKeyValid: null});
      });

      const {result} = renderHook(() => Hooks.useApiKeyInput());

      // 非同期処理の完了を待つ
      await waitFor(() => {
        expect(result.current.isValidating).toBe(false);
      });

      expect(result.current.error).toEqual(testError);
    });
  });

  describe("APIキー保存", () => {
    it("キーが入力されている場合保存する", ({expect}) => {
      const {result} = renderHook(() => Hooks.useApiKeyInput());

      // inputRefにモック要素を設定
      const mockInput = {value: "test-api-key"} as HTMLInputElement;
      // @ts-expect-error - テスト用にcurrentを直接設定
      result.current.inputRef.current = mockInput;

      act(() => {
        result.current.handleSave();
      });

      expect(useAuthStore.getState().apiKey).toBe("test-api-key");
    });

    it("キーが入力されていない場合保存しない", ({expect}) => {
      const initialApiKey = useAuthStore.getState().apiKey;
      const {result} = renderHook(() => Hooks.useApiKeyInput());

      act(() => {
        result.current.handleSave();
      });

      expect(useAuthStore.getState().apiKey).toBe(initialApiKey);
    });
  });
});
