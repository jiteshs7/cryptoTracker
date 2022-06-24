import {
  render,
  screen,
  waitFor,
} from "../../test-utils/testing-library-utils";

import userEvent from "@testing-library/user-event";
import Header from "../Header";

describe("Testing Header for UI and selecting currency", () => {
  it("Testing UI without Login", () => {
    render(<Header />, null, { user: null });

    expect(
      screen.getByRole("heading", { name: "Crypto Tracker" })
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "USD" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("User is Logged In and selecting option", () => {
    render(<Header />);

    expect(
      screen.getByRole("heading", { name: "Crypto Tracker" })
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "USD" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Login" })
    ).not.toBeInTheDocument();
  });

  it("Testing currency change", async () => {
    const changeCurrency = jest.fn();

    render(<Header />, null, { changeCurrency });
    const select = screen.getByRole("button", { name: "USD" });
    expect(select).toBeInTheDocument();

    userEvent.click(select);

    userEvent.click(await screen.findByRole("option", { name: "INR" }));
    expect(changeCurrency).toHaveBeenCalledTimes(1);
  });
});
