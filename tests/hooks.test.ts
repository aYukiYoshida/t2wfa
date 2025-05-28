import {act, renderHook, waitFor} from "@testing-library/react";
import {describe, beforeEach, afterEach, it, vi} from "vitest";
import Hooks from "@/lib/hooks";
import {useDateStore} from "@/lib/store";
import Api from "@/lib/api";

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
          key: "DEMO_KEY",
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
        expect(getApodImageSpy).toHaveBeenCalledWith({key: "DEMO_KEY", date});
      });
    });
  });
});
