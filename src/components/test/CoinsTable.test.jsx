import {
  render,
  screen,
  waitFor,
  within,
} from "../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import CoinsTable from "../CoinsTable";

describe("Testing Table data", () => {
  it("Testing Ui", () => {
    render(<CoinsTable />);
    const cryptoHeader = screen.getByText(
      "Crypto currency prices by market cap"
    );
    expect(cryptoHeader).toBeInTheDocument();
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
    const tableHead = within(table).getAllByRole("columnheader");
    expect(tableHead).toHaveLength(4);
  });

  it("Testing search functionality", async () => {
    render(<CoinsTable />);

    const searchInput = screen.getByRole("textbox");

    expect(searchInput).toBeInTheDocument();

    userEvent.clear(searchInput);
    userEvent.type(searchInput, "bit");
    await waitFor(() =>
      expect(screen.queryByText("Ethereum")).not.toBeInTheDocument()
    );
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();

    userEvent.clear(searchInput);

    expect(await screen.findByText("Ethereum")).toBeInTheDocument();

    expect(screen.getByText("Bitcoin")).toBeInTheDocument();

    userEvent.type(searchInput, "wawd");

    expect(await screen.findByText("No coins found!")).toBeInTheDocument();
  });
});
