import React from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const customTheme = createTheme({
    palette: {
      mode: 'dark',  // This sets the dark mode
      primary: {
        main: '#fff',  // This sets the primary color to white
      },
    },
});

const SubmitNotification = ({setSubmitted, notification}) => {
    return (
        <ThemeProvider theme={customTheme}>
            <div className="overlay"></div>
            <div className="notification-card">
                <h2>{notification}</h2>
                <Button 
                    size="medium"
                    variant="outlined"
                    style={{ minWidth: "10%", width: "fit-content", padding: "0.5rem" }}
                    type="submit"
                    onClick={() => setSubmitted(false)}
                >
                    Return to Form
                </Button>
            </div>
        </ThemeProvider>
    );
}

export default SubmitNotification;