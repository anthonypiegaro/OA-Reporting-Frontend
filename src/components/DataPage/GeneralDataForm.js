import React, { useState, useEffect } from "react";
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
import SubmitNotification from "./SubmitNotification";


const customTheme = createTheme({
    palette: {
      mode: 'dark',  // This sets the dark mode
      primary: {
        main: '#fff',  // This sets the primary color to white
      },
    },
});


const GeneralDataForm = ({assessments, name, templateId, userId}) => {
    const [animationClass, setAnimationClass] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [notification, setNotification] = useState("");
    const [didNotTest, setDidNotTest] = useState([]);

    useEffect(() => {
        setValues({
            ...Object.fromEntries(assessments.map(assessment => [assessment.name, {id: assessment.id, type: assessment.assessment_type, value: ""}]))
        });
        setErrors({});
    }, [templateId, name, assessments, userId]);

    useEffect(() => {
        setAnimationClass('card-entering');

        const timeoutId = setTimeout(() => {
        setAnimationClass('card-entered');
        }, 0); // Starts the animation as soon as the component mounts

        return () => clearTimeout(timeoutId);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (validate()) {
            // Form submission logic
            fetch('/api/reports/build-report/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    "templateId": templateId,
                    "userId": userId,
                    "date": date,
                    "assessments": values,
                    "didNotTest": didNotTest,
                }),
            })
            .then(async response => {
                let ok = false
                if (response.status === 200) {
                    setValues({
                        ...Object.fromEntries(assessments.map(assessment => [assessment.name, {id: assessment.id, type: assessment.assessment_type, value: ""}]))});
                        ok = true;
                }
                return { data: await response.json(), ok: ok, status: response.status};
            })
            .then(({data, ok, status}) => {
                if (status === 200) {
                    setNotification("Success: " + data);
                } else if (status === 400) {
                    setNotification("Form not submitted: " + data);
                } else {
                    setNotification("Form not submitted: " + data.detail);
                }
                setSubmitted(true);
            })
            .catch((error) => {
                console.error('Error:', error);
                setNotification("Form not submitted: Looks like an issue occured, I'll look into it.");
                setSubmitted(true);
            });
        }
    };

    const handleDateChange = (newDate) => {
        setDate(newDate);
      };

    const handleSelectChange = (assessment, newValue) => {
        setValues(prevValues => ({
            ...prevValues,
            [assessment.name]: {id: assessment.id, type: assessment.assessment_type, value: newValue} 
        }));
    };

    const validate = () => {
        const newErrors = {};
        
        assessments.forEach(assessment => {
            const value = values[assessment.name]
            if (assessment.assessment_type === "qualitative") {
                if (!assessment.qualitative_choices.some(choice => choice.choice === value.value)) {
                    newErrors[assessment.name] = "Invalid selection";
                }
            } else {
                if (isNaN(value.value) || value.value === "") {
                    newErrors[assessment.name] = "Must be a number";
                }
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <>
        {submitted && <SubmitNotification setSubmitted={setSubmitted} notification={notification}/>}
        <ThemeProvider theme={customTheme}>
            <form className={`input-data-form ${animationClass}`} onSubmit={handleSubmit}>
                <Typography variant="h4" component="h2" align="center" sx={{ marginBottom: 3 }}>
                    {name} Form
                </Typography>
                <DateSelector onChange={handleDateChange} />
                <br />
                <Box
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    {assessments.map((assessment) => (
                        (assessment.assessment_type === "qualitative") ? (
                            <FormControl key={assessment.id} variant="standard" style={{ width: "250px", margin: "0.5rem" }} error={!!errors[assessment.name]}>
                                <InputLabel id={`select-${assessment.id}-label`}>{assessment.name}</InputLabel>
                                <Select
                                    labelId={`select-${assessment.id}-label`}
                                    id={`select-${assessment.id}`}
                                    label={assessment.name}
                                    value={values[assessment.name] ? values[assessment.name]["value"] : ""}
                                    onChange={(event) => handleSelectChange(assessment, event.target.value)}
                                >
                                    {assessment.qualitative_choices.map((choice) => (
                                        <MenuItem key={choice.id} value={choice.choice}>{choice.choice}</MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>Select one of the following options</FormHelperText>
                            </FormControl>
                        ) : (
                            <TextField 
                                key={assessment.id}
                                variant="standard"
                                label={assessment.name}
                                helperText={`Measured in ${assessment.unit}`}
                                type="number"
                                color="primary"  // This uses the primary color from the custom theme
                                error={!!errors[assessment.name]}
                                value={values[assessment.name] ? values[assessment.name]["value"] : ""}
                                onChange={(event) => handleSelectChange(assessment, event.target.value)}
                            />
                        )
                    ))}
                    <FormControl key={100} variant="standard" style={{ width: "250px", margin: "0.5rem" }} >
                        <InputLabel id={`select-dnt-label`}>Did Not Test</InputLabel>
                        <Select
                            labelId={`select-dnt-label`}
                            id={`select-dnt`}
                            label={"Did Not Test"}
                            multiple={true}
                            value={didNotTest}
                            onChange={(e) => setDidNotTest(e.target.value)}
                        >
                            {assessments.map((assessment) => (
                                <MenuItem key={assessment.id} value={assessment.id}>{assessment.name}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Select one of the following options</FormHelperText>
                    </FormControl>
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
        </>
    );
};

export default GeneralDataForm;