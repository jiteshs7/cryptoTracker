import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
  waitFor,
} from "../../test-utils/testing-library-utils";

import Sidebar from "../Sidebar";

describe("Testing Sidebar and features like watchlist", () => {
  it("testing basic ui", async () => {
    render(<Sidebar />);

    const avatar = screen.getByTestId("avatar");
    expect(avatar).toBeInTheDocument();
    userEvent.click(avatar);

    await waitFor(() => {
      expect(screen.getByText("Watchlist")).toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });

  it("Testing empty watchlist", async () => {
    render(<Sidebar />, null, { watchList: [] });
    const avatar = screen.getByTestId("avatar");
    expect(avatar).toBeInTheDocument();
    userEvent.click(avatar);

    await waitFor(() => {
      expect(
        screen.getByText(/No coins added in watch list/i)
      ).toBeInTheDocument();
    });
  });

  it("testing whole watchList functionaltiy", async () => {
    render(<Sidebar />);
    const avatar = screen.getByTestId("avatar");
    expect(avatar).toBeInTheDocument();
    userEvent.click(avatar);

    await waitFor(() => {
      expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    });

    const deleteBitcoin = screen.getByTestId("deleteBitcoin");

    expect(deleteBitcoin).toBeInTheDocument();

    // userEvent.click(deleteBitcoin);

    // await waitFor(() => {
    //   expect(deleteBitcoin).not.toBeInTheDocument();
    // });
  });
});
