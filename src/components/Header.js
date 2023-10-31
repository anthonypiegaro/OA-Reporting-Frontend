import React, { useState, useEffect } from 'react';

const Header = ({ title }) => {
  const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        setAnimationClass('card-entering');

        const timeoutId = setTimeout(() => {
        setAnimationClass('card-entered');
        }, 0); // Starts the animation as soon as the component mounts

        return () => clearTimeout(timeoutId);
    }, []);

  return (
    <div className={`header ${animationClass}`}>
      <span className="header-title">{title}</span>
    </div>
  );
};

export default Header;