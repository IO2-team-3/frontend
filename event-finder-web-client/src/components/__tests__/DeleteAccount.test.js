import React from "react";
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react";

import DeleteAccount from "../DeleteAccount";

test("Renders component DeleteAccount", () => {
    const {getByText} = render(<DeleteAccount/>)
    expect(getByText("Delete account")).toBeInTheDocument();
})