import React from "react";
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react";

import CreateEvent from "../CreateEvent"

test("Renders component CreateEvent", () => {
    const {getByText} = render(<CreateEvent/>)
    expect(getByText("Create")).toBeInTheDocument();
})