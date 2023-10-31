import React from "react";
import TypedText from "./TypedText";

const ReportButton = ({setSelectedReport, setSelectedReportName, id, name}) => {
    return (
        <button
            key={id}
            className="report-button"
            onClick={() => {
                setSelectedReport(id);
                setSelectedReportName(name);
            }}
        >
            <TypedText text={name} />
        </button>
    );
};

export default ReportButton;