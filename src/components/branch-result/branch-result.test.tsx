import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { BranchNameResult } from "..";

const writeText = vi.fn();

Object.assign(navigator, {
  clipboard: {
    writeText,
  },
});

describe("BranchNameResult", () => {
  it("render branch name", () => {
    render(<BranchNameResult branch="bug report" />);
    expect(screen.getByText(/bug-report/i)).toBeInTheDocument();
  });

  it("disabled slug", () => {
    render(<BranchNameResult enableSlug={false} branch="bug report" />);
    expect(screen.getByText(/bug report/i)).toBeInTheDocument();
  });

  it("button can be enable", async () => {
    render(<BranchNameResult branch="bug report" />);
    expect(screen.getByRole("button")).toBeEnabled();

    fireEvent.click(screen.getByRole("button"));

    expect(writeText).toBeCalled();
  });
});
