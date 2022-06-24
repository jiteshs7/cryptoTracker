import { render, screen, waitFor } from "../test-utils/testing-library-utils";

import Home from "../screens/home/Home";

it("Testing home screen UI", async () => {
  render(<Home />);

  expect(
    screen.getByRole("heading", { name: /Crypto Tracker/i })
  ).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  expect(screen.getAllByAltText("Ethereum")).toBeTruthy();
});
