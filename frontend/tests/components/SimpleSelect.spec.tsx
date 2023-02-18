import { render, screen } from "@testing-library/react";

import { SimpleSelect } from "../../src/components/SimpleSelect";

describe("SimpleSelect", () => {
  it("Should render correctly", () => {
    render(<SimpleSelect value="" onChange={() => {}} placeholder=""><option value="teste">teste</option></SimpleSelect>);

    expect(screen.getByText("teste")).toBeInTheDocument();
  });
});
