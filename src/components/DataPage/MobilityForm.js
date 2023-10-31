import React, { useState } from "react";
import DateSelector from "../DateSelector";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from '@mui/material/styles';


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
        name: "Horizontal Adduction Right",
        type: "selection",
        options: ["across", "short"]
    },
    {
        name: "Horizontal Adduction Left",
        type: "selection",
        options: ["across", "short"]
    },
    {
        name: "Shoulder External Rotation Right",
        type: "continuos",
        unit: "degrees"
    },
    {
        name: "Shoulder Internal Rotation Right",
        type: "continuos",
        unit: "degrees"
    },
    {
        name: "Shoulder External Rotation Left",
        type: "continuos",
        unit: "degrees"
    },
    {
        name: "Shoulder Internal Rotation Left",
        type: "continuos",
        unit: "degrees"
    },
    {
        name: "T-Spine Rotation Right",
        type: "continuos",
        unit: "degrees"
    },
    {
        name: "T-Spine Rotation Left",
        type: "continuos",
        unit: "degrees"
    },
    {
        name: "Hip Internal Rotation Right",
        type: "continuos",
        unit: "degrees"
    },
    {
        name: "Hip External Rotation Right",
        type: "continuos",
        unit: "degrees"
    },
    {
        name: "Hip Internal Rotation Left",
        type: "continuos",
        unit: "degrees"
    },
    {
        name: "Hip External Rotation Left",
        type: "continuos",
        unit: "degrees"
    },
    {
        name: "Ankle Dorsiflexion Right",
        type: "continuos",
        unit: "degrees"
    },
    {
        name: "Ankle Dorsiflexion Left",
        type: "continuos",
        unit: "degrees"
    },
    {
        name: "Overhead Squat",
        type: "selection",
        options: [1, 2, 3]
    },
    {
        name: "Hurdle Right",
        type: "selection",
        options: [1, 2, 3]
    },
    {
        name: "Hurdle Left",
        type: "selection",
        options: [1, 2, 3]
    },
    {
        name: "ASLR Right",
        type: "selection",
        options: [1, 2, 3]
    },
    {
        name: "ASLR Left",
        type: "selection",
        options: [1, 2, 3]
    },
]

const MobilityForm = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (validate()) {
            // Form submission logic
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
            
            if (test.type === "selection") {
                if (!test.options.includes(value)) {
                    newErrors[test.name] = "Invalid selection";
                }
            } else {
                if (isNaN(value) || value === "") {
                    newErrors[test.name] = "Must be a number";
                }
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <ThemeProvider theme={customTheme}>
            <form className='input-data-form' onSubmit={handleSubmit}>
                <Typography variant="h4" component="h2" align="center" sx={{ marginBottom: 3 }}>
                    Mobility Form
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
                        (test.type === "selection") ? (
                            <FormControl key={index} variant="standard" style={{ width: "250px", margin: "0.5rem" }}>
                                <InputLabel htmlFor={`select-${test.name}`}>{test.name}</InputLabel>
                                <Select
                                    labelId={`select-label-${test.name}`}
                                    id={`select-${test.name}`}
                                    label={test.name}
                                    error={!!errors[test.name]}
                                    value={values[test.name] || ""}
                                    onChange={(event) => handleSelectChange(test.name, event.target.value)}
                                >
                                    {test.options.map((option, optionIndex) => (
                                        <MenuItem key={optionIndex} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>Select one of the following options</FormHelperText>
                            </FormControl>
                        ) : (
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
                        )
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

export default MobilityForm;