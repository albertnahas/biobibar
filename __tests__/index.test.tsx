// __tests__/index.test.jsx

import { render, screen } from "@testing-library/react"
import Home from "../pages/index"
import "@testing-library/jest-dom"

describe("Home", () => {
  it("renders two logos", () => {
    render(<Home />)
    const logos = screen.getAllByAltText("BioBibar logo")
    expect(logos).toHaveLength(2)
  })
})
