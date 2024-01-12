import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header";
import UserSearchBar from "../components/DataPage/UserSearchBar";
import TypedText from "../components/TypedText";
import BuildPitchArsenalReport from "../components/PitchArsenal/BuildPitchArsenalReport";
import PitchArsenalReport from "../components/PitchArsenal/PitchArsenalReport";

const PitchArsenalPage = ({isStaff}) => {
    const [animationClass, setAnimationClass] = useState('');
    const [type, setType] = useState("report");
    const [user, setUser] = useState("");

    useEffect(() => {
        setAnimationClass('card-entering');

        const timeoutId = setTimeout(() => {
        setAnimationClass('card-entered');
        }, 0); // Starts the animation as soon as the component mounts

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="layout">
            <Sidebar isStaff={isStaff} />
            <div className="main-content">
                <Header title={"Pitch Arsenal"} />
                <div className={`report-buttons ${animationClass}`}>
                    <button key="report" className="report-button" onClick={() => setType("report")}>
                        <TypedText text={"Report"} />
                    </button>
                    {isStaff && <button key="build" className="report-button" onClick={() => setType("build")}>
                        <TypedText text={"Build"} />
                    </button>}
                </div>
                <UserSearchBar setUser={setUser} />
                <div className="report-content">
                {(type === "build") ? <BuildPitchArsenalReport user={user} /> : <PitchArsenalReport user={user} />}
                </div>
            </div>
        </div>
    );
};

export default PitchArsenalPage;