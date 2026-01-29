import {userEvent} from "@vitest/browser/context";
import {expect, describe, test, vi} from "vitest";
import {render} from "vitest-browser-react";

import {SaveKeyButton} from "@/components/ui/save-key-button";

describe("SaveKeyButton Component", () => {
  test("未検証状態ではボタンが有効になること", async () => {
    const onClick = vi.fn();
    const component = render(
      <SaveKeyButton onClick={onClick} isValidating={false} />
    );
    const saveButton = component.getByRole("button", {name: "Save"});
    await expect(saveButton).toBeVisible();
    await expect(saveButton).toBeEnabled();
  });

  test("検証中状態ではボタンが無効になること", async () => {
    const onClick = vi.fn();
    const component = render(
      <SaveKeyButton onClick={onClick} isValidating={true} />
    );
    const validatingButton = component.getByRole("button", {
      name: /Validating/,
    });
    await expect(validatingButton).toBeVisible();
    await expect(validatingButton).toBeDisabled();
  });

  test("ボタンクリックでonClickが呼ばれること", async () => {
    const onClick = vi.fn();
    const component = render(
      <SaveKeyButton onClick={onClick} isValidating={false} />
    );
    const saveButton = component.getByRole("button", {name: "Save"});

    await userEvent.click(saveButton);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
