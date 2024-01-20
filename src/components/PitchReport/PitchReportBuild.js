import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import DateSelector from "../DateSelector";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from "@mui/material/TextField";
import FormControl from '@mui/material/FormControl';
import PDFInput from "./PDFInput";
import Button from "@mui/material/Button"

const customTheme = createTheme({
    palette: {
      mode: 'dark',  // This sets the dark mode
      primary: {
        main: '#fff',  // This sets the primary color to white
      },
    },
});

const PitchReportBuild = ({athlete, setNoAthleteError}) => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [pitches, setPitches] = useState([]);
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchPitches = async () => {
            setLoading(true);
            await fetch("/api/pitch-report/get-pitches", {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                const pitchesData = {};
                const pitchErrors = {}
                data.forEach(pitch => {
                    const pitchData = {
                        "id": pitch.id,
                        "name": pitch.name,
                        "throws": false,
                        "velocity": "",
                        "spinRate": "",
                        "verticalBreak": "",
                        "horizontalBreak": "",
                    };
                    pitchesData[pitch.name] = pitchData;

                    const pitchError = {
                        "name": pitch.name,
                        "velocity": false,
                        "spinRate": false,
                        "verticalBreak": false,
                        "horizontalBreak": false,
                    }
                    pitchErrors[pitch.name] = pitchError;
                });
                setPitches(pitchesData);
                setErrors(pitchErrors);
            })
            .catch(error => console.log(error));
            setLoading(false);
        };

        fetchPitches();
    }, [])

    const handleChange = (pitchName, metric, newValue) => {
        let validChange = true;

        if (metric === "velocity") {
            const tooManyDecimal = /\.\d{2,}/.test(newValue);
            const tooManyDigits = /\d{4,}/.test(newValue);
            const tooFast = newValue > 120;
            validChange = !(tooManyDecimal || tooManyDigits || tooFast);
        } else if (metric === "spinRate") {
            const hasDecimal = /\./.test(newValue);
            const tooManyDigits = /\d{5,}/.test(newValue);
            validChange = !(hasDecimal || tooManyDigits);
        } else if (metric === "horizontalBreak" || metric === "verticalBreak") {
            const tooManyDecimal = /\.\d{2,}/.test(newValue);
            const tooManyDigits = /\d{3,}/.test(newValue);
            validChange = !(tooManyDecimal || tooManyDigits);
        }

        if (validChange) {
            setPitches(prevState => ({
                ...prevState,
                [pitchName]: {
                    ...prevState[pitchName],
                    [metric]: newValue
                }
            }));
        }
    };

    const validate = () => {
        let valid = true;

        if (!athlete) {
            valid = false;
            setNoAthleteError(true);
        } else {
            setNoAthleteError(false);
        }

        Object.entries(pitches).forEach(([pitch, data]) => {
            if (data.throws) {
                Object.entries(data).forEach(([metric, value]) => {
                    if (value == "") {
                        valid = false;
                        setErrors(prevState => ({
                            ...prevState,
                            [pitch]: {
                                ...prevState[pitch],
                                [metric]: true,
                            }
                        }));
                    } else {
                        setErrors(prevState => ({
                            ...prevState,
                            [pitch]: {
                                ...prevState[pitch],
                                [metric]: false,
                            }
                        }));
                    }
                });
            }
        });
        
        return valid;
    };

    const handleSubmit = async () => {
        if (validate()) {
            setSubmitLoading(true);
            const formData = new FormData();

            formData.append("athlete", athlete.id);
            formData.append("date", date);
            formData.append("notes", notes)
            formData.append("file", file);
            formData.append("pitches", JSON.stringify(pitches));

            await fetch("/api/pitch-report/full-report/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: formData
            })
            .then(async response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("An error occured")
                }
            })
            .then(data => {
                console.log(data);
                console.log("Have a submitted success notif");
                console.log("After ok click, have the page refresh");
            })
            .catch(error => {
                console.log("Have a failure notif");
                console.log("Dobt refresh to keep curr values");
            });
            setSubmitLoading(false);
        }
    };

    return (
        <>
        {loading
            ? <CircularProgress /> : 
            <div className="pitch-report-form">
                <ThemeProvider theme={customTheme}>
                    <Typography variant="h4" component="h2" align="center" sx={{ marginBottom: 3 }}>
                        Build Pitch Report
                    </Typography>
                    <DateSelector onChange={setDate} />
                    <br />
                    <div className="arsenal-report-sections">
                        {Object.entries(pitches).map(([pitch, data]) => (
                            <div className="arsenal-report-section" key={data.id}>
                                <Typography variant="h5" component="h3">
                                    {pitch}&nbsp;
                                    <FormControlLabel 
                                        control={<Switch />} 
                                        label="Throws"
                                        value={pitches[pitch]["throws"]}
                                        onChange={(event) => handleChange(pitch, "throws", !pitches[pitch]["throws"])}
                                    />
                                </Typography>
                                <hr />
                                {pitches[pitch]["throws"] && 
                                    <>
                                        <div className="arsenal-report-metrics">
                                        <FormControl >
                                            <TextField
                                                id="velocity"
                                                label="Velocity"
                                                variant="standard"
                                                type="number"
                                                style={{ width: "100px", height: "1.5rem", margin: "0.5rem"}}
                                                error={errors[pitch]["velocity"]}
                                                value={pitches[pitch]["velocity"]}
                                                onChange={(event) => handleChange(pitch, "velocity", event.target.value)}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <TextField
                                                id="spine-rate"
                                                label="Spin Rate"
                                                variant="standard"
                                                type="number"
                                                style={{ width: "100px", height: "1.5rem", margin: "0.5rem"}}
                                                error={errors[pitch]["spinRate"]}
                                                value={pitches[pitch]["spinRate"]}
                                                onChange={(event) => handleChange(pitch, "spinRate", event.target.value)}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <TextField
                                                id="vertical-break"
                                                label="IVB"
                                                variant="standard"
                                                type="number"
                                                style={{ width: "100px", height: "1.5rem", margin: "0.5rem"}}
                                                error={errors[pitch]["verticalBreak"]}
                                                value={pitches[pitch]["verticalBreak"]}
                                                onChange={(event) => handleChange(pitch, "verticalBreak", event.target.value)}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <TextField
                                                id="horizontal-break"
                                                label="HB"
                                                variant="standard"
                                                type="number"
                                                style={{ width: "100px", height: "1.5rem", margin: "0.5rem"}}
                                                error={errors[pitch]["horizontalBreak"]}
                                                value={pitches[pitch]["horizontalBreak"]}
                                                onChange={(event) => handleChange(pitch, "horizontalBreak", event.target.value)}
                                            />
                                        </FormControl>
                                        </div>
                                    </>
                                }
                            </div>
                        ))}
                    </div>
                    <div style={{width: "80%"}}>
                        <TextField 
                            variant="outlined"
                            label="Notes"
                            value={notes}
                            onChange={(event) => setNotes(event.target.value)}
                            fullWidth
                            autoComplete="off"
                        />
                    </div>
                    <PDFInput file={file} setFile={setFile} />
                    <Button 
                        size="medium"
                        variant="outlined"
                        style={{ minWidth: "10%", width: "fit-content", padding: "0.5rem" }}
                        type="submit"
                        onClick={handleSubmit}
                    >
                        {submitLoading ?
                            <i className="fa-solid fa-spinner fa-spin" style={{color: "#ffffff"}}></i> :
                            <p style={{margin: 0}}>Submit</p>
                        }
                    </Button>
                </ThemeProvider>
            </div>
        }
        </>
    );
};

export default PitchReportBuild;