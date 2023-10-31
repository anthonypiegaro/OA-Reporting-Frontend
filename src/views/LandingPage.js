import React, { useState, useEffect } from "react";
import TypedText from "../components/TypedText";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const customTheme = createTheme({
    palette: {
      mode: 'dark',  // This sets the dark mode
      primary: {
        main: '#fff',  // This sets the primary color to white
      },
    },
});

const LandingPage = () => {
    const [animationClass, setAnimationClass] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setAnimationClass('card-entering');

        const timeoutId = setTimeout(() => {
        setAnimationClass('card-entered');
        }, 0); // Starts the animation as soon as the component mounts

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="landing">
            <ThemeProvider theme={customTheme}>
                <TypedText text="OA Reporting" />
                <Button 
                        size="medium"
                        variant="outlined"
                        style={{ minWidth: "10%", width: "fit-content", padding: "0.5rem" }}
                        type="submit"
                        onClick={() => navigate("/login")}
                        className={`${animationClass}`}
                    >
                        Login
                    </Button>
            </ThemeProvider>
        </div>
    );

};

export default LandingPage;