import React, { useState, useEffect } from "react";
import DateSelector from "../DateSelector";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from "@mui/material/TextField";
import CircularProgress from '@mui/material/CircularProgress';
import Button from "@mui/material/Button";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import SubmitNotification from "../DataPage/SubmitNotification";

const customTheme = createTheme({
    palette: {
      mode: 'dark',  // This sets the dark mode
      primary: {
        main: '#fff',  // This sets the primary color to white
      },
    },
});

const BuildPitchArsenalReport = ({athlete, setAthleteError}) => {
    const [loading, setLoading] = useState(true);
    const [values, setValues] = useState({});
    const [fetchedData, setFetchedData] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [notification, setNotification] = useState("");
    const [waitingResponse, setWaitingResponse] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getData = () => {
            fetch("/api/pitch-arsenal/all-pitches/", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            })
            .then(response => response.json())
            .then(data => setFetchedData(data))
            .catch(error => console.log(error));
        };

        getData();
    }, [])

    useEffect(() => {
        if (fetchedData.length > 0) {
            const newValues = {};
            const errorValues = {};

            fetchedData.forEach(pitch => {
                const data = {};
                const metrics = {};
                const attributes = {};

                const errorData = {};
                const errorMetrics = {};
                const errorAttributes = {};

                data.pitchId = pitch.id;
                data.notes = "";
                data.throws = false;

                metrics.velocity = "";
                metrics.spinRate = "";
                metrics.verticalBreak = "";
                metrics.horizontalBreak = "";

                errorMetrics.velocity = false
                errorMetrics.spinRate = false
                errorMetrics.verticalBreak = false
                errorMetrics.horizontalBreak = false

                data.metrics = metrics;
                errorData.metrics = errorMetrics;

                pitch.attributes.forEach(attribute => {
                    attributes[attribute.id] = "";
                    errorAttributes[attribute.id] = false;
                });

                data.attributes = attributes
                errorData.attributes = errorAttributes;

                newValues[pitch.id] = data;
                errorValues[pitch.id] = errorData;
            });


            setValues(newValues);
            setErrors(errorValues);
            console.log(values);
            setLoading(false);
        } 
    }, [fetchedData]);

    const resetValues = () => {
        if (fetchedData.length > 0) {
            const newValues = {};
            const errorValues = {};

            fetchedData.forEach(pitch => {
                const data = {};
                const metrics = {};
                const attributes = {};

                const errorData = {};
                const errorMetrics = {};
                const errorAttributes = {};

                data.pitchId = pitch.id;
                data.notes = "";
                data.throws = false;

                metrics.velocity = "";
                metrics.spinRate = "";
                metrics.verticalBreak = "";
                metrics.horizontalBreak = "";

                errorMetrics.velocity = false
                errorMetrics.spinRate = false
                errorMetrics.verticalBreak = false
                errorMetrics.horizontalBreak = false

                data.metrics = metrics;
                errorData.metrics = errorMetrics;

                pitch.attributes.forEach(attribute => {
                    attributes[attribute.id] = "";
                    errorAttributes[attribute.id] = false;
                });

                data.attributes = attributes
                errorData.attributes = errorAttributes;

                newValues[pitch.id] = data;
                errorValues[pitch.id] = errorData;
            });


            setValues(newValues);
            setErrors(errorValues);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setWaitingResponse(true);

        console.log("form Submitted and being validated");

        const valid = validate();

        if (valid) {
            const data = {
                athlete: athlete,
                date: date,
                report: values,
            };
            await fetch("/api/pitch-arsenal/create-report/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ data }),
            })
            .then(response => {
                if (response.ok) {
                    setNotification("Pitch Arsenal Report Created");
                    resetValues();
                } else {
                    setNotification("An error occured");
                }
            })
            .finally(() => {
                setSubmitted(true);
                setWaitingResponse(false);
            });
        } else {
            setWaitingResponse(false);
        }
    };


    const updateTopLevelValue = (pitchId, key, newValue) => {
        setValues(prevState => ({
            ...prevState,
            [pitchId]: {
                ...prevState[pitchId],
                [key]: newValue,
            }
        }));
    };

    const updateNestedValue = (pitchId, key, metric, newValue) => {
        // add rule to check of change is valid, if not, do not update
        let validChange = true;

        if (key === "metrics") {
            if (metric === "velocity") {
                const tooManyDecimal = /\.\d{2,}/.test(newValue);
                const tooManyDigits = /\d{4,}/.test(newValue);
                validChange = !(tooManyDecimal || tooManyDigits);
            } else if (metric === "spinRate") {
                const hasDecimal = /\./.test(newValue);
                const tooManyDigits = /\d{5,}/.test(newValue);
                validChange = !(hasDecimal || tooManyDigits);
            } else if (metric === "horizontalBreak" || metric === "verticalBreak") {
                const tooManyDecimal = /\.\d{2,}/.test(newValue);
                const tooManyDigits = /\d{3,}/.test(newValue);
                validChange = !(tooManyDecimal || tooManyDigits);
            }
        }

        if (validChange) {
            setValues(prevState => ({
                ...prevState,
                [pitchId]: {
                    ...prevState[pitchId],
                    [key]: {
                        ...prevState[pitchId][key],
                        [metric]: newValue
                    }
                }
            }));
        }
    };

    const validate = () => {

        let valid = true;

        if (athlete === "") {
            valid = false;
            setAthleteError(true);
            console.log("No Athlete");
        } else {
            setAthleteError(false);
        }

        Object.entries(values).forEach(([pitchId, data]) => {
            if (data.throws) {
                Object.entries(data.metrics).forEach(([metric, value]) => {
                    const error = value === "" ? true : false 
                    if (error) { valid = false; }
                    setErrors(prevState => ({
                        ...prevState,
                        [pitchId]: {
                            ...prevState[pitchId],
                            ["metrics"]: {
                                ...prevState[pitchId]["metrics"],
                                [metric]: error
                            }
                        }
                    }));
                });

                Object.entries(data.attributes).forEach(([id, value]) => {
                    const error = value === "" ? true : false 
                    if (error) { valid = false; }
                    setErrors(prevState => ({
                        ...prevState,
                        [pitchId]: {
                            ...prevState[pitchId],
                            ["attributes"]: {
                                ...prevState[pitchId]["attributes"],
                                [id]: error
                            }
                        }
                    }));
                });

            }
        });

        return valid;
    };

    return (
        <>
            {(loading && (Object.keys(values).length === 0)) ? (
                <CircularProgress />
            ) : (
            <>
            {submitted && <SubmitNotification setSubmitted={setSubmitted} notification={notification} />}
            <ThemeProvider theme={customTheme} > 
                <form className={`input-data-form`}>
                    <Typography variant="h4" component="h2" sx={{ marginBottom: 3 }}>
                        Build Pitch Arsenal Report
                    </Typography>
                    <DateSelector onChange={setDate}/>
                    <br />
                    <div className="arsenal-report-sections">
                        {fetchedData.map((pitch) => (
                            <div className="arsenal-report-section" key={pitch.id}>
                                <Typography variant="h5" component="h3">
                                    {pitch.name}&nbsp;
                                    <FormControlLabel 
                                        control={<Switch />} 
                                        label="Throws"
                                        value={values[pitch.id]["throws"] ? values[pitch.id]["throws"] : ""}
                                        onChange={(event) => updateTopLevelValue(pitch.id, "throws", !values[pitch.id]["throws"])}
                                        />
                                </Typography>
                                <hr />
                                {values[pitch.id].throws && 
                                    <>
                                    <div className="arsenal-report-metrics">
                                    <FormControl >
                                        <TextField
                                            id="velocity"
                                            label="Velocity"
                                            variant="standard"
                                            type="number"
                                            style={{ width: "100px", height: "1.5rem", margin: "0.5rem"}}
                                            error={!!errors[pitch.id]["metrics"]["velocity"]}
                                            value={values[pitch.id]["metrics"].velocity ? values[pitch.id]["metrics"].velocity : ""}
                                            onChange={(event) => updateNestedValue(pitch.id, "metrics", "velocity", event.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <TextField
                                            id="spine-rate"
                                            label="Spin Rate"
                                            variant="standard"
                                            type="number"
                                            style={{ width: "100px", height: "1.5rem", margin: "0.5rem"}}
                                            error={!!errors[pitch.id]["metrics"]["spinRate"]}
                                            value={values[pitch.id]["metrics"].spinRate ? values[pitch.id]["metrics"].spinRate : ""}
                                            onChange={(event) => updateNestedValue(pitch.id, "metrics", "spinRate", event.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <TextField
                                            id="vertical-break"
                                            label="IVB"
                                            variant="standard"
                                            type="number"
                                            style={{ width: "100px", height: "1.5rem", margin: "0.5rem"}}
                                            error={!!errors[pitch.id]["metrics"]["verticalBreak"]}
                                            value={values[pitch.id]["metrics"].verticalBreak ? values[pitch.id]["metrics"].verticalBreak : ""}
                                            onChange={(event) => updateNestedValue(pitch.id, "metrics", "verticalBreak", event.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <TextField
                                            id="horizontal-break"
                                            label="HB"
                                            variant="standard"
                                            type="number"
                                            style={{ width: "100px", height: "1.5rem", margin: "0.5rem"}}
                                            error={!!errors[pitch.id]["metrics"]["horizontalBreak"]}
                                            value={values[pitch.id]["metrics"].horizontalBreak ? values[pitch.id]["metrics"].horizontalBreak : ""}
                                            onChange={(event) => updateNestedValue(pitch.id, "metrics", "horizontalBreak", event.target.value)}
                                        />
                                    </FormControl>
                                </div>
                                <div className="pitch-arsenal-attributes">
                                {pitch.attributes.map((attribute) => (
                                    <div className="pitch-arsenal-attribute" key={attribute.id}>
                                        <Typography variant="body1" paragraph={true} >
                                            {attribute.attribute}
                                        </Typography>
                                        <FormControl style={{ width: '100px', marginLeft: "0.5rem"}}>
                                            <InputLabel
                                                id={`${attribute.id}-label`}
                                            >
                                                Score
                                            </InputLabel>
                                            <Select
                                                labelId={`${attribute.id}-label`}
                                                id={`${attribute.id}-select`}
                                                label="Score"
                                                error={!!errors[pitch.id]["attributes"][attribute.id]}
                                                value={values[pitch.id]["attributes"][attribute.id] ? values[pitch.id]["attributes"][attribute.id] : ""}
                                                onChange={(event) => updateNestedValue(pitch.id, "attributes", attribute.id, event.target.value)}
                                            >
                                                {attribute.choices.map(choice => {
                                                    return <MenuItem key={choice.id} value={choice.id}>{choice.score}</MenuItem>
                                                })}
                                            </Select>
                                        </FormControl>
                                    </div>
                                ))}
                                </div>
                                <TextField
                                    id={`${pitch.name}-notes`}
                                    label="Notes"
                                    multiline
                                    value={values[pitch.id]["notes"] ? values[pitch.id]["notes"] : ""}
                                    onChange={(event) => updateTopLevelValue(pitch.id, "notes", event.target.value)}
                                />
                                    </>
                                }
                            </div>
                        ))}
                    </div>
                    <Button 
                        size="medium"
                        variant="outlined"
                        style={{ minWidth: "10%", width: "fit-content", padding: "0.5rem" }}
                        type="submit"
                        onClick={handleSubmit}
                    >
                        {waitingResponse ?
                            <i className="fa-solid fa-spinner fa-spin" style={{color: "#ffffff"}}></i> :
                            <p style={{margin: 0}}>Submit</p>
                        }
                    </Button>
                </form>
            </ThemeProvider>
            </>
            )}
        </>
    );
}

export default BuildPitchArsenalReport;