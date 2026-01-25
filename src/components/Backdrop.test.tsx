import { render } from "@testing-library/react";
import Backdrop from "./Backdrop";

describe("Backdrop", () => {
  it("renders correctly", () => {
    const { container } = render(<Backdrop />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
