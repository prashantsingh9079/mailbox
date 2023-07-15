import HomeComponent from "../components/LoginComponent";
import { render, screen } from "@testing-library/react"


test('login component testing ', () => {
  render(<HomeComponent/>)

  const a = screen.getByText("Welcome to Mailbox!!!",{exact:false})

  expect(a).toBeInTheDocument();
})

