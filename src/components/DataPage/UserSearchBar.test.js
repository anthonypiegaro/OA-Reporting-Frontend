import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import UserSearchBar from "./UserSearchBar";

jest.spyOn(global, "fetch");

const mockUserData = [
    { id: 1, name: "Jane Doe"},
    { id: 2, name: "John Doe"}
];

beforeEach(() => {
    global.fetch.mockReset();
});

const findByTextInDropdown = (text) => {
    return screen.findByRole('option', { name: text });
};

test("UserSearchBar renders with the fetched users", async () => {

    global.fetch.mockImplementation(async (url) => {
        if (url.endsWith("/api/users/simple-list-users/")) {
          return {
            json: async () => mockUserData,
          };
        }
    });

    const mockSetUser = jest.fn();

    render(<UserSearchBar setUser={mockSetUser} />);

    const buttonElement = screen.getByRole('button', { name: 'Open' });

    fireEvent.click(buttonElement);

    await findByTextInDropdown('Jane Doe');
    await findByTextInDropdown('John Doe');

    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
});