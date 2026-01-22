import {http, HttpResponse} from "msw";
import {setupServer} from "msw/node";
import {describe, afterEach, afterAll, beforeAll, it, vi} from "vitest";

import Api from "@/lib/api";

describe("テストスパイを用いたテストコードの例", () => {
  // テストスパイは、テスト対象の間接出力を記録し、テストコードからそれを参照可能にするテストダブルである
  // テスト対象である getApodImage の間接出力を記録する
  // ここで getApodImage の間接出力は fetch に対する URL を指定しての呼び出しである
  // ここでは fetch を差し替えるテストスパイを定義する
  const arrangeFetchSpy = () =>
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
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
        {status: 200}
      )
    );

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Api.getApodImage", () => {
    describe("クエリパラメータ: APIキー", () => {
      describe("指定した場合", () => {
        it("指定したAPIキーでAPODの画像の情報が取得される", async ({
          expect,
        }) => {
          const fetchSpy = arrangeFetchSpy();
          await Api.getApodImage({apiKey: "SPECIFIED_KEY"});
          expect(fetchSpy).toHaveBeenCalledTimes(1);
          expect(fetchSpy).toHaveBeenCalledWith(
            "https://api.nasa.gov/planetary/apod?api_key=SPECIFIED_KEY"
          );
        });
      });
      describe("指定しない場合", () => {
        it("デモ用のAPIキーでAPODの画像の情報が取得される", async ({
          expect,
        }) => {
          const fetchSpy = arrangeFetchSpy();
          await Api.getApodImage();
          expect(fetchSpy).toHaveBeenCalledTimes(1);
          expect(fetchSpy).toHaveBeenCalledWith(
            "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
          );
        });
      });
    });
    describe("クエリパラメータ: 日付", () => {
      describe("指定した場合", () => {
        it("指定した日付でAPODの画像の情報が取得される", async ({expect}) => {
          const fetchSpy = arrangeFetchSpy();
          const date = new Date("2025-04-07");
          await Api.getApodImage({date});
          expect(fetchSpy).toHaveBeenCalledTimes(1);
          expect(fetchSpy).toHaveBeenCalledWith(
            "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2025-04-07"
          );
        });
      });
    });
  });
});

describe("フェイクオブジェクトを用いたテストコードの例", () => {
  // フェイクオブジェクトは、代替する対象と同じように振る舞うテストダブルである
  // ここでは APOD API をフェイクオブジェクトとして定義する
  const apodApiFake = [
    // Intercept "GET https://api.nasa.gov/planetary/apod" requests...
    http.get("https://api.nasa.gov/planetary/apod", ({request}) => {
      // Construct a URL instance out of the intercepted request.
      const url = new URL(request.url);
      const apiKey = url.searchParams.get("api_key");
      if (apiKey === "VALID_KEY" || apiKey === "DEMO_KEY") {
        // ...and respond to them using this JSON response.
        return HttpResponse.json(
          {
            copyright: "copyright",
            date: "2025-02-26",
            explanation: "explanation",
            hdurl:
              "https://apod.nasa.gov/apod/image/2502/ClusterRing_Euclid_2665.jpg",
            media_type: "image",
            service_version: "v1",
            title: "Einstein Ring Surrounds Nearby Galaxy Center",
            url: "https://apod.nasa.gov/apod/image/2502/ClusterRing_Euclid_960.jpg",
          },
          {status: 200}
        );
      } else {
        return HttpResponse.json(
          {
            error: {
              code: "API_KEY_INVALID",
              message:
                "An invalid api_key was supplied. Get one at https://api.nasa.gov:443",
            },
          },
          {
            status: 403,
          }
        );
      }
    }),
  ];

  const server = setupServer(...apodApiFake);

  // Start server before all tests
  beforeAll(() => server.listen({onUnhandledRequest: "error"}));

  // Close server after all tests
  afterAll(() => server.close());

  // Reset handlers after each test for test isolation
  afterEach(() => server.resetHandlers());

  describe("Api.getApodImage", () => {
    describe("クエリパラメータ: APIキー", () => {
      describe("指定する場合", () => {
        describe("有効なAPIキーの場合", () => {
          it("APODの画像情報の取得が成功する", async ({expect}) => {
            const apodImage = await Api.getApodImage({apiKey: "VALID_KEY"});
            expect(apodImage).toEqual({
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
          });
        });
        describe("無効なAPIキーの場合", () => {
          it("APODの画像情報の取得が失敗する", async ({expect}) => {
            await expect(
              Api.getApodImage({apiKey: "INVALID_KEY"})
            ).rejects.toThrowError("Invalid API key: 403 Forbidden");
          });
        });
      });
      describe("指定しない場合", () => {
        it("APODの画像情報の取得が成功する", async ({expect}) => {
          const apodImage = await Api.getApodImage();
          expect(apodImage).toEqual({
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
        });
      });
    });
  });
});
