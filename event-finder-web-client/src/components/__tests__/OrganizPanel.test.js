import React from "react";
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react";

import OrganizPanel from "../OrganizPanel"

test("Renders component OrganizPanel", () => {
    const {getByText} = render(<OrganizPanel/>)
    expect(getByText("Organizer's panel")).toBeInTheDocument();
})