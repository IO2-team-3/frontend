import React from "react";
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react";

import Navbar from "../Navbar"

test("Renders component Navbar", () => {
    render(<Navbar/>)
    const text = screen.getAllByText('Log in');
    expect(text[0]).toBeInTheDocument();
})