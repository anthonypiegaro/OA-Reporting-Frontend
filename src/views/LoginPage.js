import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";

const customTheme = createTheme({
    palette: {
      mode: 'dark',  // This sets the dark mode
      primary: {
        main: '#fff',  // This sets the primary color to white
      },
    },
});


const LoginPage = ({setIsStaff}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [animationClass, setAnimationClass] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setAnimationClass('card-entering');

        const timeoutId = setTimeout(() => {
        setAnimationClass('card-entered');
        }, 0); // Starts the animation as soon as the component mounts

        return () => clearTimeout(timeoutId);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("/api/token/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.access);
                localStorage.setItem("refresh", data.refresh);
                console.log("here");
                const res = await fetch("/api/users/is-staff/", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (res.ok) {
                    const resData = await res.json();
                    setIsStaff(resData.isStaff);
                    localStorage.setItem("isStaff", resData.isStaff);
                }
                navigate("/report");
            } else {
                const errorData = await response.json();
                setError(errorData.detail || "Login failed");
            }
        } catch (error) {
            console.log(error);
            setError("Network error: Unable to connect to server");
        }
    }

    return (
        <div className="login-card">
            <ThemeProvider theme={customTheme}>
                <form className={`login-form ${animationClass}`} onSubmit={handleSubmit}>
                    <Typography variant="h4" component="h2" align="center">
                        Login
                    </Typography>
                    <TextField 
                        variant="standard"
                        label="email"
                        color="primary"
                        style={{ width: "250px", margin: "0.5rem" }}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField 
                        variant="standard"
                        label="password"
                        type="password"
                        color="primary"
                        style={{ width: "250px", margin: "0.5rem" }}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button 
                        size="medium"
                        variant="outlined"
                        style={{ minWidth: "10%", width: "fit-content", padding: "0.5rem", margin: "0.5rem" }}
                        type="submit"
                    >
                        Submit
                    </Button>
                    {error && <div className="error">{error}</div>}
                </form>
            </ThemeProvider>
        </div>
    );
};

export default LoginPage