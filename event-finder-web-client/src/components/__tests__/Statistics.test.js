import React from "react";
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react";

import Statistics from "../Statistics"

test("Renders component Statistics", () => {
    const {getByText} = render(<Statistics/>)
    expect(getByText("1M+")).toBeInTheDocument();
})