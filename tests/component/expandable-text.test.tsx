import {userEvent} from "@vitest/browser/context";
import {describe, expect, test} from "vitest";
import {render} from "vitest-browser-react";

import {ExpandableText as ExpandableTextComponent} from "@/components/ui/expandable-text";

import {addTestId} from "../helpers";

describe("ExpandableText Component", () => {
  const ExpandableText = addTestId(ExpandableTextComponent);

  test("クリック前の場合文字列が省略されて表示されること", async () => {
    const component = render(
      <ExpandableText>
        これはテスト用の長いテキストです。クリックすると展開され、もう一度クリックすると折りたたまれます。
      </ExpandableText>
    );
    const textElement = component.getByTestId("ExpandableText");

    await expect(textElement).toHaveAccessibleDescription("Click to expand");
    await expect(textElement).toHaveClass("text-ellipsis");
    await expect(textElement).toHaveClass("overflow-hidden");
    await expect(textElement).toHaveClass("whitespace-nowrap");
  });

  test("クリック後の場合文字列が省略されずに表示されること", async () => {
    const component = render(
      <ExpandableText>
        これはテスト用の長いテキストです。クリックすると展開され、もう一度クリックすると折りたたまれます。
      </ExpandableText>
    );
    const textElement = component.getByTestId("ExpandableText");

    await userEvent.click(textElement);

    await expect(textElement).toHaveAccessibleDescription("Click to collapse");
    await expect(textElement).toHaveClass("text-balance");
    await expect(textElement).toHaveClass("whitespace-normal");
    await expect(textElement).toHaveClass("break-words");
    await expect(textElement).toHaveClass("hyphens-auto");
  });
});
