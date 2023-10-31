import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const customTheme = createTheme({
    palette: {
      mode: 'dark',  // This sets the dark mode
      primary: {
        main: '#fff',  // This sets the primary color to white
      },
    },
});

const UserSearchBar = ({setUser}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("/api/users/simple-list-users/", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            setUsers(data);
        };
    
        fetchUsers();
    }, []);

    return (
        <ThemeProvider theme={customTheme}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={users}
                getOptionLabel={(user) => user.name}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Athlete" />}
                style={{ alignSelf: 'center', marginTop: ".5rem" }}
                onChange={(event, newValue) => {setUser(newValue);}}
            />
        </ThemeProvider>
    );
};

export default UserSearchBar;