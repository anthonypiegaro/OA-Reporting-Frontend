import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import ReportButtons from "../components/ReportButtons";
import Header from "../components/Header";
import ReportDatePicker from "../components/ReportDatePicker";
import Report from "../components/Report/Report";

const ReportPage = ({isStaff}) => {
    const [reportTypes, setReportTypes] = useState([])
    const [selectedReport, setSelectedReport] = useState("");
    const [selectedReportName, setSelectedReportName] = useState("")
    const [dates, setDates] = useState([]);
    const [date, setDate] = useState("");
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        const fetchTemplates = async () => {
            const response = await fetch("/api/reports/report-templates-min/", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            console.log("fetchTemplates ran");
            console.log("Templates: " + data);
            setReportTypes(data);
            setSelectedReport(data[0].id);
            setSelectedReportName(data[0].name);
        };
    
        fetchTemplates();
    }, []);

    useEffect(() => {
        const fetchDates = async () => {
            setDate("");
            setDates([]);
            if (selectedReport) {
                const response = await fetch(`/api/reports/report-templates/${selectedReport}/report-dates/`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                })
                const data = await response.json();
                console.log("fetchDates Ran");
                console.log("Dates: " + data);
                console.log(data);
                if (Array.isArray(data) && data.length > 0) {
                    setDates(data);
                    setDate(data[0].creation_date);
                }
            }
        };

        fetchDates();
    }, [selectedReport]);

    useEffect(() => {
        setReportData([]);
        const fetchReport = async () => {
            if (selectedReport && date) {
                const response = await fetch(`/api/reports/user-report/${selectedReport}/${date}/`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                });
                const data = await response.json();
                console.log(data);
                console.log("fetchReport Ran");
                setReportData(data);
            }
        }

        fetchReport();
    }, [date]);

    return (
        <div className="layout">
            <Sidebar isStaff={isStaff}/>
            <div className="main-content">
                
                <Header title="Report Page" />
                <ReportButtons 
                    setSelectedReport={setSelectedReport}
                    setSelectedReportName={setSelectedReportName}
                    reports={reportTypes}
                />
                <div className="report-content-title">{selectedReportName}</div>
                {/* {date && dates && (
                    <ReportDatePicker 
                        selectedDate={date}
                        setDate={setDate}
                        dates={dates}
                    />
                )} */}
                <ReportDatePicker 
                        selectedDate={date}
                        setDate={setDate}
                        dates={dates}
                />
                <div className="report-content">
                    {reportData && <Report assessments={reportData} />}
                </div>
            </div>
        </div>
    );
};

export default ReportPage;