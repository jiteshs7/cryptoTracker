import { screen, render } from "@testing-library/react";

import Banner from "../Banner";

test("Testing occurence of banner", async () => {
  render(<Banner />);

  const header = screen.getByText("Crypto Tracker");

  expect(header).toBeInTheDocument();
});
