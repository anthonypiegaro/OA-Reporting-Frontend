import React, { useState, useEffect, useRef } from "react";
import TypedText from "../TypedText";
import { BarChart, CartesianGrid, YAxis, Tooltip, Bar, ResponsiveContainer, Label, LabelList } from "recharts";

const MyBarChart = ({data, passed}) => {
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        setAnimationClass('card-entering');

        const timeoutId = setTimeout(() => {
        setAnimationClass('card-entered');
        }, 0); // Starts the animation as soon as the component mounts

        return () => clearTimeout(timeoutId);
    }, []);

    const [fontSize, setFontSize] = useState('1rem'); // Initial font size
    const titleRef = useRef(null);

    useEffect(() => {
        adjustFontSize();
    }, []); // Empty dependency array to run only once when component mounts

    const adjustFontSize = () => {
        const titleElement = titleRef.current;

        while (titleElement.scrollHeight > titleElement.clientHeight) {
            const currentSize = window.getComputedStyle(titleElement, null).getPropertyValue('font-size');
            const newSize = parseFloat(currentSize) - 0.5; // Decrease by 0.5px, adjust as needed
            setFontSize(`${newSize}px`);
        }
    };

    return (
        <div className={`bar-chart-container ${animationClass}`}>
            <h2 className="bar-chart-title" style={{ fontSize: fontSize }} ref={titleRef}>
                <TypedText text={data[0].name} />
            </h2>
            <div className="bar-chart" >
                <ResponsiveContainer width="80%" height="90%">
                    <BarChart data={data} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <YAxis>
                            <Label value={data[0].unit} angle={-90} position="insideLeft" />
                        </YAxis>
                        <Tooltip />
                        <Bar dataKey="score" fill={passed ? "#82ca9d" : "#FF4C4C"} >
                            <LabelList fill="black" />
                        </Bar>
                        <Bar dataKey="standard" fill="#8884d8" >
                            <LabelList fill="black" />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MyBarChart;
