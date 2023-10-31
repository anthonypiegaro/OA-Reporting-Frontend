import React, { useState, useEffect } from 'react';

const TypedText = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(displayedText + text[index]);
        setIndex(index + 1);
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => {
      clearInterval(timer);
    };
  }, [displayedText, index, text, speed]);

  return <span>{displayedText}</span>;
};

TypedText.defaultProps = {
  text: "NA",
  speed: 100
};

export default TypedText;
