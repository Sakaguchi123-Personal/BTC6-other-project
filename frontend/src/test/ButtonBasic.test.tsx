import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import "../../matchMedia.mock";

import { ButtonBasic } from "../components";

describe("Button", () => {
  it("buttonがレンダリングされる", () => {
    render(
      <MantineProvider>
        <ButtonBasic>children</ButtonBasic>
      </MantineProvider>
    );
    const element = screen.getByRole("button");
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("children");
  });
});
