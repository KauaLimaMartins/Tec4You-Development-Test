import { render, screen } from "@testing-library/react";

import { SimpleButton } from "../../src/components/SimpleButton";

describe("SimpleButton", () => {
  it("Should render correctly", () => {
    render(<SimpleButton>Botao de teste</SimpleButton>);

    expect(screen.getByText("Botao de teste")).toBeInTheDocument();
  });
});
