import React, { useState, useEffect } from "react";
import TypedText from "./TypedText";

const BioCard = ({title, content, includeCheck, passed}) => {
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        setAnimationClass('card-entering');

        const timeoutId = setTimeout(() => {
        setAnimationClass('card-entered');
        }, 0); // Starts the animation as soon as the component mounts

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className={`bio-card ${animationClass}`}>
            <div className="bio-card-title">
                <TypedText text={ title } />
            </div>
            <div className="bio-card-score">
                <TypedText text={ content } />
            </div>
            { includeCheck && 
                <div className="bio-card-logo">
                    <span className="material-symbols-outlined">done</span>
                </div>
            }
            {/* Here, add a fail or pass logo depending on pass or fail */}
        </div>
    );
};

BioCard.defaultProps = {
    title: "", 
    content: "",
    includeCheck: false,
    passed: false,
  };

export default BioCard;