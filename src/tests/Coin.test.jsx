import { render, screen, waitFor } from "../test-utils/testing-library-utils";

import Coin from "../screens/coin/Coin";

// To tackle useParams hooke we will mock it like this
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    id: "bitcoin",
  }),
  useRouteMatch: () => ({ url: "/coin/id" }),
}));

describe("Testing coin basic needs", () => {
  it("Testing UI for coin screen", async () => {
    render(<Coin />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByAltText(/bitcoin/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
    expect(screen.getByText("24 Hours")).toBeInTheDocument();
  });
});
