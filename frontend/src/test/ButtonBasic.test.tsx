import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "../../matchMedia.mock";

import { ButtonBasic } from "../components";

describe("Button", () => {
  it("buttonがレンダリングされる", async () => {
    const onClickMock = jest.fn();
    render(
      <MantineProvider>
        <ButtonBasic click={onClickMock}>children</ButtonBasic>
      </MantineProvider>
    );
    //レンダリングされたbuttonを取得
    const element = screen.getByRole("button");
    expect(element).toBeInTheDocument();
    //childrenに渡した文字があるかテスト
    expect(element).toHaveTextContent("children");

    //queryを使用し、buttonをクリックする
    await userEvent.click(element);
    //クリックしたときonClickMockが1回実行されたかをテスト
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
