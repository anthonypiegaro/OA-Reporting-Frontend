import React, { useState, useEffect } from "react";
import PitchReport from "./PitchReport";
import DatePicker from "./DatePicker";

const PitchArsenalReport = ({athlete}) => {
    const [date, setDate] = useState("");
    const [dates, setDates] = useState([]);
    const [report, setReport] = useState({});

    const fakeData = {
        "Four-Seam Fastball": {
            "notes": "This will be the main pitch to work on.",
            "metrics": {
                "velocity": 78.4,
                "spin_rate": 1900,
                "vertical_break": 7.2,
                "horizontal_break": 3.2
            },
            "scores": [
                {
                    "attribute": "Velocity Relative to Level",
                    "score": 1,
                    "description": "Get bigger, faster, stronger"
                },
                {
                    "attribute": "Spin Rate/Spin Efficiency",
                    "score": 2,
                    "description": "You are slightly on the side of the ball at release, either get more extension or feel yourself pronate through ball release."
                },
                {
                    "attribute": "More IVB than HB by at least 5\"",
                    "score": 2,
                    "description": "Get spin tilt closer to 12:00 will produce more backspin which equals more IVB."
                }
            ]
        },
        "Changeup": {
            "notes": "This pitch is locked in. Doesn't need to be worked on that much.",
            "metrics": {
                "velocity": 70.2,
                "spin_rate": 800,
                "vertical_break": 3.2,
                "horizontal_break": 10.8
            },
            "scores": [
                {
                    "attribute": "8-10 mph off conpared to FB",
                    "score": 3,
                    "description": "Good"
                },
                {
                    "attribute": "Less than 10\" of IVB",
                    "score": 3,
                    "description": "Good"
                },
                {
                    "attribute": "Kill spin compared to FB by at least 500",
                    "score": 2,
                    "description": "Spread out your middle and ring fingers on the baseball."
                }
            ]
        }
    }

    useEffect(() => {
        const getDates = async () => {
            await fetch(`/api/pitch-arsenal/get-dates/${athlete.id}/`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => response.json())
            .then(data => setDates(data))
            .catch(error => console.log(error))
        };

        if (athlete) {
            getDates();
        }

    }, [athlete]);

    useEffect(() => {
        if (dates.length > 0) {
            setDate(dates[0].date);
        } else {
            setDate("");
        }
    }, [dates]);

    useEffect(() => {
        const getReport = async () => {
            await fetch(`/api/pitch-arsenal/get-report/${athlete.id}/${date}/`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => response.json())
            .then(data => setReport(data))
            .catch(error => console.log(error));
        }

        if (date) {
            getReport();
        } else {
            setReport({});
        }

    }, [date])



    return (
        <div className="pitch-arsenal-report">
            <DatePicker selectedDate={date} dates={dates} setDate={setDate} />
            {Object.keys(report).length > 0 && <PitchReport reportData={report} />}
        </div>
    );
};

export default PitchArsenalReport;