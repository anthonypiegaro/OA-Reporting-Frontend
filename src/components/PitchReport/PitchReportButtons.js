import React from "react";
import TypedText from "../TypedText";

const PitchReportButtons = ({isStaff, setType}) => {
    return (
        <div className="report-buttons">
            <button key="report" className="report-button" onClick={() => setType("report")}>
                <TypedText text={"Report"} />
            </button>
            {isStaff && <button key="build" className="report-button" onClick={() => setType("build")}>
                <TypedText text={"Build"} />
            </button>}
        </div>
    );
};

export default PitchReportButtons;