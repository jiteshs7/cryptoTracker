//progressbar
import {
  render,
  screen,
  waitFor,
} from "../../test-utils/testing-library-utils";

import CoinInfo from "../CoinInfo";

// usage eg jest.spyOn(math, 'random') to recall all previous requests

jest.mock("react-chartjs-2", () => ({
  // ...jest.requireActual('react-chartjs-2'),
  Line: (props) => {
    // expect(props.type).toBe("line");
    return <div>Line Chart</div>;
  },
}));

// const mockedLine = jest.mocked(<Line />);

it("Testing info of coin", async () => {
  render(<CoinInfo coinId="bitcoin" />);

  const loader = screen.getByRole("progressbar");
  expect(loader).toBeInTheDocument();
  await waitFor(() => {
    expect(loader).not.toBeInTheDocument();
  });
  expect(screen.getByText("Line Chart")).toBeInTheDocument();
});
