import React, { useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DateSelector = ({ onChange }) => {
    const [value, setValue] = useState(dayjs(new Date()));

    const handleDateChange = (newValue) => {
        console.log(newValue.format('YYYY-MM-DD'));
        setValue(newValue.format()); // Update the local state
        onChange(newValue.format('YYYY-MM-DD')); // Call the callback function with the selected date
    };

    return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    className="date-picker"
                    views={['year', 'month', 'day']}
                    slotProps={{
                        textField: {
                            helperText: "Report Date",
                        }
                    }}
                    value={value}
                    onChange={handleDateChange}  
                />
        </LocalizationProvider>
    );
};

export default DateSelector;