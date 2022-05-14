import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./";

describe("App", () => {
  test("renders app container", async () => {
    render(<App />);

    const linkElement = screen.getByText(/Loading.../i);
    expect(linkElement).toBeInTheDocument();
  });
});
