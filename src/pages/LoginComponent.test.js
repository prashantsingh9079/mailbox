import LoginComponent from "../components/LoginComponent";
import { render, screen } from "@testing-library/react"


test('login component testing ', () => {
  render(<LoginComponent/>)

  const a = screen.getByText("Already have a account, please click here",{exact:false})

  expect(a).toBeInTheDocument();
})

