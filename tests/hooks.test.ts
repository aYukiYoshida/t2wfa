import {renderHook, waitFor} from "@testing-library/react";
import {describe, afterEach, it, vi} from "vitest";
import Hooks from "@/lib/hooks";

describe("テストスタブを用いたテストコード", () => {
  // テストスタブは、テスト対象への間接入力を操作するテストダブルである
  // テスト対象である useFetchApodImage の間接入力を事前に設定して使用する
  // ここで useFetchApodImage の間接入力は 内部で実行する getApodImage の戻り値である
  // ここでは getApodImage を差し替える戻り値を指定したテストスタブを定義する

  describe("Hooks.useFetchApodImage", () => {
    describe("データ取得が成功した場合", () => {
      it("画像の情報が返る", async ({expect}) => {
        // テストスタブの定義
        vi.mock("@/lib/api", () => {
          return {
            default: {
              getApodImage: vi.fn().mockResolvedValue({
                copyright: "copyright",
                date: "2025-02-26",
                explanation: "explanation",
                hdurl:
                  "https://apod.nasa.gov/apod/image/2502/ClusterRing_Euclid_2665.jpg",
                media_type: "image",
                service_version: "v1",
                title: "Einstein Ring Surrounds Nearby Galaxy Center",
                url: "https://apod.nasa.gov/apod/image/2502/ClusterRing_Euclid_960.jpg",
              }),
            },
          };
        });

        const date = new Date("2025-02-26");
        const {result} = renderHook(() => Hooks.useFetchApodImage(date));

        // 非同期処理の完了を待つ
        await waitFor(() => {
          expect(result.current.image).not.toBeNull();
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
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
});
