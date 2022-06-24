import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import AuthModal from "../AuthModal";

test("Checking google button and tabs", async () => {
  render(<AuthModal />);

  const loginBtn = screen.getByRole("button", { name: "Login" });

  expect(loginBtn).toBeInTheDocument();

  userEvent.click(loginBtn);

  const loginTab = screen.getByRole("tab", { name: "Login" });

  expect(loginTab).toBeInTheDocument();

  const signUpTab = screen.getByRole("tab", { name: "Sign Up" });

  expect(signUpTab).toBeInTheDocument();

  const googleText = screen.getByText("Sign in with google");

  expect(googleText).toBeInTheDocument();

  userEvent.keyboard("{esc}");

  await waitFor(() => {
    expect(googleText).not.toBeInTheDocument();
  });
});
