import React from "react";
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react";

import Footer from "../Footer";

test("Renders component Footer", () => {
    const {getByText} = render(<Footer/>)
    expect(getByText("Revolutionary booking and event system.")).toBeInTheDocument();
})