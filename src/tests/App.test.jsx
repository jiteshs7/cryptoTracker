import { render, screen } from "../test-utils/testing-library-utils";

import App from "../App";

it("Testing app.js file", () => {
  render(<App />, null, { user: null });

  expect(screen.getByRole("button", { name: /usd/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /Track all cryptos in one go!/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("textbox")).toBeInTheDocument();

  expect(screen.getByRole("table")).toBeInTheDocument();
});
