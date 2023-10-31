import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SubmitNotification from "./SubmitNotification";


test("SubmitNotification renders with notification", () => {
    const notification = "Success: Form Submitted";

    const mockSetSubmitted = jest.fn();

    render(<SubmitNotification 
            notification={notification}
            setSubmitted={mockSetSubmitted} />);

    expect(screen.getByText(notification)).toBeInTheDocument();
});

test("Clicking button calls setSubmitted function", () => {
    const notification = "Success: Form Submitted";

    const mockSetSubmitted = jest.fn();

    render(<SubmitNotification 
        notification={notification}
        setSubmitted={mockSetSubmitted} />);
    
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(mockSetSubmitted).toHaveBeenCalledWith(false);
});
