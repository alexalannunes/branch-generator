import { fireEvent, render, screen } from "@testing-library/react";
import { BranchNameResult } from "..";

const writeText = vitest.fn();

Object.assign(navigator, {
  clipboard: {
    writeText,
  },
});

describe("BranchNameResult", () => {
  test("render branch name", () => {
    render(<BranchNameResult branch="bug report" />);
    expect(screen.getByText(/bug-report/i)).toBeInTheDocument();
  });

  test("disabled slug", () => {
    render(<BranchNameResult enableSlug={false} branch="bug report" />);
    expect(screen.getByText(/bug report/i)).toBeInTheDocument();
  });

  test("button can be enable", async () => {
    render(<BranchNameResult branch="bug report" />);
    expect(screen.getByRole("button")).toBeEnabled();

    fireEvent.click(screen.getByRole("button"));

    expect(writeText).toBeCalled();
  });
});
