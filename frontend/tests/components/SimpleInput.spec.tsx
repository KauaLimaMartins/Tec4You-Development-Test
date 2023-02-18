import { render, screen } from "@testing-library/react";

import { SimpleInput } from "../../src/components/SimpleInput";

describe("SimpleInput", () => {
  it("Should render correctly", () => {
    render(<SimpleInput type="text" value="" onChange={() => {}} placeholder="teste" />);

    expect(screen.getByPlaceholderText("teste")).toBeInTheDocument();
  });
});
