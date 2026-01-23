import {userEvent} from "@vitest/browser/context";
import {describe, expect, test} from "vitest";
import {render} from "vitest-browser-react";

import {ExpandableText} from "@/components/ui/expandable-text";

describe("ExpandableText Component", () => {
  test("クリック前の場合文字列が省略されて表示されること", async () => {
    const component = render(
      <ExpandableText>
        これはテスト用の長いテキストです。クリックすると展開され、もう一度クリックすると折りたたまれます。
      </ExpandableText>
    );
    const textElement = component.getByTestId("ExpandableText");

    await expect(textElement).toHaveAttribute("title", "Click to expand");
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

    await expect(textElement).toHaveAttribute("title", "Click to collapse");
    await expect(textElement).toHaveClass("text-balance");
    await expect(textElement).toHaveClass("whitespace-normal");
    await expect(textElement).toHaveClass("break-words");
    await expect(textElement).toHaveClass("hyphens-auto");
  });
});
