import { render, screen } from "@testing-library/react";
import App from "./App";
import { AppProviders } from "./app/providers";

describe("test", () => {
  test("initial test", () => {
    render(
      <AppProviders>
        <App />
      </AppProviders>
    );
    expect(screen.getByText(/lorem/i)).toBeInTheDocument();
  });
});
