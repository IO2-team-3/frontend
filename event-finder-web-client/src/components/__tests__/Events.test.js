import React from "react";
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react";

import Events from "../Events";

test("Renders component Events", () => {
    const {getByText} = render(<Events/>)
    expect(getByText("All events")).toBeInTheDocument();
})