import React, { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const customTheme = createTheme({
    palette: {
      mode: 'dark',  // This sets the dark mode
      primary: {
        main: '#fff',  // This sets the primary color to white
      },
    },
});

const DatePicker = ({selectedDate, dates, setDate}) => {

    const handleChange = (event) => {
        setDate(event.target.value);
    }

    return (
        <div class="pitch-arsenal-date-picker">
        <ThemeProvider theme={customTheme} >
            <FormControl sx={{ width: "25ch", alignSelf: "center"}}>
                <InputLabel id="date-select-label">Date</InputLabel>
                <Select
                labelId="date-select-label"
                id="date-select"
                value={selectedDate}
                label="Date"
                onChange={handleChange}
                >
                {dates.map((date, index) => (
                    <MenuItem key={index} value={date.date}>{date.date}</MenuItem>
                ))}
                </Select>
            </FormControl>
        </ThemeProvider>
        </div>
    );
};

export default DatePicker;