import { render, screen } from "@testing-library/react";

import NotFound from "../screens/notFound/NotFound";

it("Testing not found UI", () => {
  render(<NotFound />);

  expect(screen.getByText(/Page Not Found! Error 404./i)).toBeInTheDocument();
});
