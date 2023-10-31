import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const customTheme = createTheme({
    palette: {
      mode: 'dark',  // This sets the dark mode
      primary: {
        main: '#fff',  // This sets the primary color to white
      },
    },
});

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.clear();
        navigate("/login");
        window.location.reload();
    }

    return (
            <div className="notification-card">
                <h1>Session Expired</h1>
                <p>Re login to continue</p>
                <ThemeProvider theme={customTheme}>
                    <Button 
                        size="medium"
                        variant="outlined"
                        style={{ minWidth: "10%", width: "fit-content", padding: "0.5rem", margin: "0.5rem" }}
                        type="submit"
                        onClick={handleClick}
                    >
                        Login Page
                    </Button>
                </ThemeProvider>
            </div>
    );
};

export default ErrorPage;