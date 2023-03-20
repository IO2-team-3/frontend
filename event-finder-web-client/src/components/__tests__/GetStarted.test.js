import React from "react";
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react";

import GetStarted from "../GetStarted"

test("Renders component GetStarted", () => {
    const {getByText} = render(<GetStarted/>)
    expect(getByText("Get started")).toBeInTheDocument();
})