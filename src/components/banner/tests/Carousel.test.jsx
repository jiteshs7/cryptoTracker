import { screen, render } from "../../../test-utils/testing-library-utils";

import Carousel from "../Carousel";

test("testing proper coursel", async () => {
  render(<Carousel />);

  const loader = screen.getByText("Loading...");
  expect(loader).toBeInTheDocument();

  const symbol = await screen.findAllByText("btc");
  expect(symbol[0]).toBeInTheDocument();
});
