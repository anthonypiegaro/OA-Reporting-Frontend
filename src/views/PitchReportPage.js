import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header";
import PitchReportButtons from "../components/PitchReport/PitchReportButtons";
import UserSearchBar from "../components/DataPage/UserSearchBar";
import PitchReportReport from "../components/PitchReport/PitchReportReport";
import PitchReportBuild from "../components/PitchReport/PitchReportBuild";

const PitchReportPage = ({isStaff}) => {
    const [type, setType] = useState("report");
    const [user, setUser] = useState("");
    const [error, setError] = useState(false);

    return (
        <div className="layout">
            <Sidebar isStaff={isStaff}/>
            <div className="main-content">
                <Header title="Pitch Report" />
                <PitchReportButtons isStaff={isStaff} setType={setType} />
                <UserSearchBar setUser={setUser} error={error} />
                <div className="report-content">
                    {type === "report"
                    ? <PitchReportReport athlete={user} />
                    : <PitchReportBuild athlete={user} setNoAthleteError={setError} />
                    }
                </div>
            </div>
        </div>
    );
};

export default PitchReportPage;