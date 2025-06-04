import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Login from "@/app/(auth)/_components/Login";


jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Login page testing", () => {
  it("renders a heading", () => {
    render(<Login />);

    const heading = screen.getByText(/Enter your details below/i);

    expect(heading).toBeInTheDocument();
  });

  it("should show validation errors for password input", async () => {
    render(<Login />);

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const submitBtn = screen.getByTestId("btn-submit");

    fireEvent.input(emailInput, { target: { value: "" } });
    fireEvent.input(passwordInput, { target: { value: "" } });

    fireEvent.click(submitBtn);

    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    await waitFor(async () => {
      const emailError = await screen.findByTestId("email-error");
      expect(emailError).toHaveTextContent("Email is required");
    });

    fireEvent.input(emailInput, { target: { value: "invalidemail" } });
    fireEvent.input(passwordInput, { target: { value: "123" } });

    fireEvent.click(submitBtn);

    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    await waitFor(async () => {
      const emailError = await screen.findByTestId("email-error");
      expect(emailError).toHaveTextContent("Wrong email");
    });
  });
});
