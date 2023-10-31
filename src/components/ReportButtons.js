import React, { useState, useEffect } from "react";
import ReportButton from "./ReportButton";

const ReportButtons = ({ setSelectedReport, setSelectedReportName, reports }) => {
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        setAnimationClass('card-entering');

        const timeoutId = setTimeout(() => {
        setAnimationClass('card-entered');
        }, 0); // Starts the animation as soon as the component mounts

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className={`report-buttons ${animationClass}`}>
            {reports.map(report => (
                <ReportButton 
                    key={report.id}
                    id={report.id} 
                    name={report.name}
                    setSelectedReport={setSelectedReport}
                    setSelectedReportName={setSelectedReportName}
                />
            ))}
        </div>
    );
};

export default ReportButtons;