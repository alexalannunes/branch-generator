import { render, screen } from "@testing-library/react";
import { BranchNameResult } from "..";

describe("test", () => {
  test("render branch name", () => {
    render(<BranchNameResult branch="bug report" />);
    expect(screen.getByText(/bug-report/i)).toBeInTheDocument();
  });

  test("disabled slug", () => {
    render(<BranchNameResult enableSlug={false} branch="bug report" />);
    expect(screen.getByText(/bug report/i)).toBeInTheDocument();
  });
});
