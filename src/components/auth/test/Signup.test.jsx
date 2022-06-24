import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import Signup from "../Signup";

describe("Signup UI and data flow", () => {
  test("Happy flow", async () => {
    render(<Signup handleClose={jest.fn()} />);

    const emailInput = screen.getByRole("textbox", { name: "Enter email" });

    expect(emailInput).toBeInTheDocument();

    userEvent.clear(emailInput);
    userEvent.type(emailInput, "js@email.com");

    const passInput = screen.getByLabelText("Enter password");

    expect(passInput).toBeInTheDocument();

    userEvent.clear(passInput);
    userEvent.type(passInput, "12345678");

    const signUpBtn = screen.getByRole("button", { name: "Sign Up" });

    expect(signUpBtn).toBeInTheDocument();

    // userEvent.click(signUpBtn);
  });

  test("Signup without input anything", async () => {
    render(<Signup handleClose={jest.fn()} />);

    const signUpBtn = screen.getByRole("button", { name: "Sign Up" });

    expect(signUpBtn).toBeInTheDocument();

    userEvent.click(signUpBtn);

    await waitFor(() => {
      expect(
        screen.getByText("Please enter your email address.")
      ).toBeInTheDocument();
    });
    expect(screen.getByText("Please enter your password")).toBeInTheDocument();
  });

  test("Entering incorrect email and try to signup", async () => {
    render(<Signup handleClose={jest.fn()} />);
    const emailInput = screen.getByLabelText("Enter email");

    expect(emailInput).toBeInTheDocument();

    userEvent.clear(emailInput);
    userEvent.type(emailInput, "abc");

    const signUpBtn = screen.getByRole("button", { name: "Sign Up" });

    expect(signUpBtn).toBeInTheDocument();

    userEvent.click(signUpBtn);

    await waitFor(() => {
      expect(
        screen.getByText("Please enter valid email address.")
      ).toBeInTheDocument();
    });
  });

  test("Entering incorrect password and try to signup", async () => {
    render(<Signup handleClose={jest.fn()} />);
    const passInput = screen.getByLabelText("Enter password");

    expect(passInput).toBeInTheDocument();

    userEvent.clear(passInput);
    userEvent.type(passInput, "abc");

    const signUpBtn = screen.getByRole("button", { name: "Sign Up" });

    expect(signUpBtn).toBeInTheDocument();

    userEvent.click(signUpBtn);

    await waitFor(() => {
      expect(
        screen.getByText("password must be of atleast 8 characters.")
      ).toBeInTheDocument();
    });
  });

  it("Entering wrong confirm password and try to signup", () => {
    render(<Signup handleClose={jest.fn()} />);
    const passInput = screen.getByLabelText("Enter password");

    expect(passInput).toBeInTheDocument();

    userEvent.clear(passInput);
    userEvent.type(passInput, "12345678");

    const confirmPass = screen.getByLabelText("Confirm password");

    expect(confirmPass).toBeInTheDocument();

    userEvent.clear(confirmPass);
    userEvent.type(confirmPass, "123456789");

    expect(confirmPass).not.toEqual(passInput);
  });
});
