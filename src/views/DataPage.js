import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header";
import ReportButtons from "../components/ReportButtons";
import GeneralDataForm from "../components/DataPage/GeneralDataForm";
import UserSearchBar from "../components/DataPage/UserSearchBar";


const DataPage = ({isStaff}) => {
    const [user, setUser] = useState("");
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState("");
    const [selectedReportName, setSelectedReportName] = useState("")
    const [assessments, setAssessments] = useState([]);

    useEffect(() => {
        const fetchTemplates = async () => {
            const response = await fetch("/api/reports/report-templates-min/", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            setReports(data);
            setSelectedReport(data[0].id);
            setSelectedReportName(data[0].name)
        };
    
        fetchTemplates();
    }, []);

    useEffect(() => {
        const fetchAssessments = async () => {
            if (selectedReport) {
                const response = await fetch(`/api/reports/report-templates/${selectedReport}/assessments/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const data = await response.json();
                setAssessments(data);
            }
        };
    
        fetchAssessments();
      }, [selectedReport]);  // This array specifies the dependencies for useEffect

    return (
        <div className="layout">
            <Sidebar isStaff={isStaff}/>
            <div className="main-content">
                <Header title="Add Data" />
                <ReportButtons 
                    setSelectedReport={setSelectedReport}
                    setSelectedReportName={setSelectedReportName}
                    reports={reports}
                />
                <UserSearchBar setUser={setUser} />
                <div className="report-content">
                {selectedReport && selectedReportName && (
                    <GeneralDataForm 
                        assessments={assessments} 
                        name={selectedReportName}
                        templateId={selectedReport}
                        userId={user.id}
                    />
                )}
                </div>
            </div>
        </div>
    );
};

export default DataPage;