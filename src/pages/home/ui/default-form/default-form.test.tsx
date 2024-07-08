import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { DefaultForm } from ".";

describe("Default form", () => {
  it("renders correctly", () => {
    render(<DefaultForm />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByTestId("branch-name-result")).toBeInTheDocument();
  });

  it("type some branch name", () => {
    render(<DefaultForm />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "update documentation of api" },
    });
    expect(screen.getByTestId("branch-name-result")).toHaveTextContent(
      "update-documentation-of-api"
    );
  });
});
