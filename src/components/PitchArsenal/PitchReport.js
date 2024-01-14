import React from "react";

const PitchReport = ({reportData}) => {
    return (
        <div className="pitch-report">
            {Object.entries(reportData).map(([pitch, data]) => (
                <div key={pitch} className="pitch-report-card">
                    <div className="pitch-report-card-header">{pitch}</div>
                    <div className="pitch-report-card-metrics">
                        <div className="pitch-report-card-metric">Velocity: {data.metrics.velocity} mph</div>
                        <div className="pitch-report-card-metric">Spin Rate: {data.metrics.spin_rate} rpm</div>
                        <div className="pitch-report-card-metric">Vertical Break: {data.metrics.vertical_break} in</div>
                        <div className="pitch-report-card-metric">Horizontal Break: {data.metrics.horizontal_break} in</div>
                    </div>
                    <div className="pitch-report-card-scores">
                        {data.scores.map((score) => (
                            <div className="pitch-report-card-score">
                                <div>{score.attribute}</div>
                                <div>{score.score}</div>
                                <div>{score.description}</div>
                            </div>
                        ))}
                    </div>
                    <div>{data.notes}</div>
                </div>
            ))}
        </div>
    );
};

export default PitchReport;