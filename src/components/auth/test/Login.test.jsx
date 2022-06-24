import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import Login from "../Login";

describe("Login UI and data flow", () => {
  test("Happy flow", async () => {
    render(<Login handleClose={jest.fn()} />);

    const emailInput = screen.getByLabelText("Enter email");

    expect(emailInput).toBeInTheDocument();

    userEvent.clear(emailInput);
    userEvent.type(emailInput, "js@email.com");

    const passInput = screen.getByLabelText("Enter password");

    expect(passInput).toBeInTheDocument();

    userEvent.clear(passInput);
    userEvent.type(passInput, "12345678");

    const loginBtn = screen.getByRole("button", { name: "Login" });

    expect(loginBtn).toBeInTheDocument();

    // userEvent.click(loginBtn);
  });

  test("Login without input anything", async () => {
    render(<Login handleClose={jest.fn()} />);

    const loginBtn = screen.getByRole("button", { name: "Login" });

    expect(loginBtn).toBeInTheDocument();

    userEvent.click(loginBtn);

    await waitFor(() => {
      expect(
        screen.getByText("Please enter your email address.")
      ).toBeInTheDocument();
    });
    expect(screen.getByText("Please enter your password")).toBeInTheDocument();
  });

  test("Entering incorrect email and try to login", async () => {
    render(<Login handleClose={jest.fn()} />);
    const emailInput = screen.getByLabelText("Enter email");

    expect(emailInput).toBeInTheDocument();

    userEvent.clear(emailInput);
    userEvent.type(emailInput, "abc");

    const loginBtn = screen.getByRole("button", { name: "Login" });

    expect(loginBtn).toBeInTheDocument();

    userEvent.click(loginBtn);

    await waitFor(() => {
      expect(
        screen.getByText("Please enter valid email address.")
      ).toBeInTheDocument();
    });
  });

  test("Entering incorrect password and try to login", async () => {
    render(<Login handleClose={jest.fn()} />);
    const passInput = screen.getByLabelText("Enter password");

    expect(passInput).toBeInTheDocument();

    userEvent.clear(passInput);
    userEvent.type(passInput, "abc");

    const loginBtn = screen.getByRole("button", { name: "Login" });

    expect(loginBtn).toBeInTheDocument();

    userEvent.click(loginBtn);

    await waitFor(() => {
      expect(
        screen.getByText("password must be of atleast 8 characters.")
      ).toBeInTheDocument();
    });
  });
});
