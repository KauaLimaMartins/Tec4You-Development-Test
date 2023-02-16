import { render, screen } from "@testing-library/react";

import HomePage from "../../src/pages";

describe("Home Page", () => {
  it("Should render correctly", () => {
    render(<HomePage />);

    expect(screen.getByText("Início")).toBeInTheDocument();
  });
});
