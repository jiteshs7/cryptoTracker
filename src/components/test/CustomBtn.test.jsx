import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CustomBtn from "../CustomBtn";

const handleSubmit = jest.fn();

it("Testing custom Button UI", () => {
  render(
    <CustomBtn selected={true} onClick={handleSubmit}>
      Click me
    </CustomBtn>
  );

  const btnText = screen.getByText("Click me");

  expect(btnText).toBeInTheDocument();

  userEvent.click(btnText);

  expect(handleSubmit).toHaveBeenCalledTimes(1);
});
