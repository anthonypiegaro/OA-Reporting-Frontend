import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import GeneralDataForm from "./GeneralDataForm";

const mockAssessments = [
    {
        name: "Quantitative Assessment",
        id: 1,
        assessment_type: "quantitative",
    },
    {
        name: "Qualitative Assessment",
        id: 2,
        assessment_type: "qualitative",
        qualitative_choices: [
            {id: 1, choice: "Choice 1"},
            {id: 2, choice: "Choice 2"}
        ]
    },
]

const mockName = "General Form";

const mockTemplateId = 1;

const mockUserId = 1;

test("GeneralDataForm renders with assessment inputs", async () => {

    render(<GeneralDataForm 
            assessments={mockAssessments}
            name={mockName}
            templateId={mockTemplateId}
            userId={mockUserId}
            />);
    
    const selectElement = screen.getByLabelText("Qualitative Assessment");

    expect(selectElement).toBeInTheDocument();

    fireEvent.click(selectElement);

    expect(screen.getByText("Qualitative Assessment")).toBeInTheDocument();
    expect(screen.getByText("Quantitative Assessment")).toBeInTheDocument();
});
