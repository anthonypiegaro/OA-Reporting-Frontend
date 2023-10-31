import React, { useState } from "react";
import DateSelector from "../DateSelector";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles"

// Define a custom theme
const customTheme = createTheme({
  palette: {
    mode: 'dark',  // This sets the dark mode
    primary: {
      main: '#fff',  // This sets the primary color to white
    },
  },
});

const tests = [
    {
        name: "Pull-Ups",
        unit: "reps"
    },
    {
        name: "Push-Ups",
        unit: "reps"
    },
    {
        name: "Lateral Jump Right",
        unit: "inches"
    },
    {
        name: "Lateral Jump Left",
        unit: "inches"
    },
    {
        name: "Broad Jump",
        unit: "inches"
    },
    {
        name: "Vertical Jump",
        unit: "inches"
    },
    {
        name: "Medball Toss",
        unit: "mph"
    },
    {
        name: "Pro Agility",
        unit: "seconds"
    },
    {
        name: "10 Yard Acceleration",
        unit: "seconds"
    },
    {
        name: "Plate Pinch Hold Right",
        unit: "seconds"
    },
    {
        name: "Plate Pinch Hold Left",
        unit: "seconds"
    },
    {
        name: "W Hold",
        unit: "seconds"
    },
]

const PhysicalForm = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (validate()) {
            // form submission logic
        }
    };

    const [values, setValues] = useState(
        Object.fromEntries(tests.map(test => [test.name, ""]))
    );

    const handleSelectChange = (testName, newValue) => {
        setValues(prevValues => ({
            ...prevValues,
            [testName]: newValue
        }));
    };

    const [errors, setErrors] = React.useState({});

    const validate = () => {
        const newErrors = {};
        
        tests.forEach(test => {
            const value = values[test.name]
            
            if (isNaN(value) || value === "") {
                newErrors[test.name] = "Must be a number";
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

  return (
    <ThemeProvider theme={customTheme}>
        <form className='input-data-form' onSubmit={handleSubmit}>
          <Typography variant="h4" component="h2" align="center" sx={{ marginBottom: 3 }}>
              Physical Form
          </Typography>
          <DateSelector />
          <br />
            <Box
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                {tests.map((test, index) => (
                    <TextField 
                        key={index}
                        variant="standard"
                        label={test.name}
                        helperText={`Measured in ${test.unit}`}
                        type="number"
                        color="primary"  // This uses the primary color from the custom theme
                        error={!!errors[test.name]}
                        value={values[test.name] || ""}
                        onChange={(event) => handleSelectChange(test.name, event.target.value)}
                />
                ))}
            </Box>
            <br />
            <Button 
                size="medium"
                variant="outlined"
                style={{ minWidth: "10%", width: "fit-content", padding: "0.5rem" }}
                type="submit"
            >
                Submit
            </Button>
        </form>
    </ThemeProvider>
  );
};

export default PhysicalForm;