import {userEvent} from "@vitest/browser/context";
import {expect, describe, test} from "vitest";
import {render} from "vitest-browser-react";

import {InputKey} from "@/components/ui/input-key";

describe("InputKey Component", () => {
  test("キー入力欄が表示されること", async () => {
    const component = render(<InputKey />);
    const inputField = component.getByPlaceholder("Enter API KEY of APOD");
    await expect(inputField).toBeVisible();
    await expect(inputField).toBeEnabled();
  });

  test("保存ボタンが表示されること", async () => {
    const component = render(<InputKey />);
    const saveButton = component.getByRole("button", {name: "Save"});
    await expect(saveButton).toBeVisible();
    await expect(saveButton).toBeEnabled();
  });

  test("保存ボタンをクリックするとAPIキーが設定されること", async () => {
    const component = render(<InputKey />);
    const inputField = component.getByPlaceholder("Enter API KEY of APOD");
    const saveButton = component.getByRole("button", {name: "Save"});

    // 入力フィールドに値を入力し、保存ボタンをクリック
    await userEvent.fill(inputField, "test-api-key");
    await userEvent.click(saveButton);

    // APIキーが設定されたか確認
    expect(document.cookie).toContain("apod-api-key=test-api-key");
  });
});
