import React from "react";
import ReportCard from "./ReportCard";

const Report = ({assessments}) => {

    return (
        <div className="pitching-report">
            {/* for every drill, add a card here */}
            {assessments.map(assessment => (
                <ReportCard assessment={assessment} key={assessment.name} />
            ))}
        </div>
    );
};

export default Report;