import React, { useState, useEffect } from "react";
import TypedText from "../TypedText";
import MyBarChart from "./MyBarChart";

const ReportCard = ({ assessment }) => {
    const [expanded, setExpanded] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        setAnimationClass('card-entering');

        const timeoutId = setTimeout(() => {
        setAnimationClass('card-entered');
            }, 0); // Starts the animation as soon as the component mounts

            return () => clearTimeout(timeoutId);
        }, []);

        const handleExpand = () => {
            if (!expanded) {
              setExpanded(true);
              setTimeout(() => {
                setShowContent(true);
              }, 300); // 300ms matches the transition duration
            } else {
              setShowContent(false);
              setTimeout(() => {
                setExpanded(false);
              }, 300);
            }
          };

    return (
        <div className={`mobility-card ${animationClass} ${expanded ? 'expanded' : ''}`}>
            <div className="mobility-card-title">
                <TypedText text={ assessment.name } />
            </div>
            <div className="mobility-card-score-container">
                <div className="mobility-card-score">
                    <TypedText text={ assessment.score.toString() + " " + (assessment.unit ? ` ${assessment.unit}` : '') } />
                </div>
                <div className="mobility-card-logo" style={{ color: assessment.passed ? 'green' : 'red' }}>
                    {assessment.passed ? (
                        <div className="material-symbols-outlined">done</div>
                    ) : (
                        <div className="material-symbols-outlined">close</div>
                    )}       
                </div>
            </div>
            <div onClick={handleExpand} className={`mobility-card-expand-button material-symbols-outlined ${expanded ? 'up' : 'down'}` }>
                expand_more
            </div>
            {showContent && (
                <div className="mobility-card-expanded-content">
                    {assessment.type == "quantitative" && 
                    <MyBarChart
                        data={[{
                            name: assessment.name,
                            score: assessment.score,
                            standard: assessment.passing_score,
                            unit: assessment.unit
                        }]}
                        passed={assessment.passed}
                    />
                    }
                    <TypedText speed={2} text={ assessment.description } />
                    {assessment.drills.length > 0 &&  (
                    <>
                        <TypedText text={"Drills:"} />
                        {assessment.drills.map(drill => (
                            <a className="report-drill" href={drill.drill_url} target="_blank">
                                <TypedText key={`drill-${drill.name}`} speed={10} text={drill.name} />
                            </a>
                        ))}
                    </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ReportCard;