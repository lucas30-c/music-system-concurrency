import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, MenuItem } from '@mui/material';
import { TextField, IconButton, Menu } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import DownloadCSV from '../DownloadCSV';
import NavigationBar from '../NavigationBar';
import SidebarMenu from '../SidebarMenu';
import IBMPlexSans from '../../fonts/IBM_Plex_Sans/IBMPlexSans-Regular.ttf';
import "./index.css"


const theme = createTheme({
    palette: {
        primary: {
            main: '#5d5fef',
        },
    },
    typography: {
        fontFamily: 'IBMPlexSans',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            @font-face {
              font-family: 'IBMPlexSans';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: local('IBMPlexSans'), local('IBMPlexSans-Regular'), url(${IBMPlexSans}) format('ttf');
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }
          `,
        },
    },
});


const Results = () => {

    // dummy data
    const dummyResults = [
        {
            testID: "1",
            studyID: "12345",
            dateOfSubmission: "2023-08-30T13:45:20.000Z",
            age: 30,
            gender: "Male",
            ethnicity: "Caucasian",
            answers: "Q1,A1\nQ2,A2\nQ3,A3"
        },
        {
            testID: "2",
            studyID: "12345",
            dateOfSubmission: "2023-09-02T09:21:45.000Z",
            age: 25,
            gender: "Female",
            ethnicity: "Asian",
            answers: "Q1,A4\nQ2,A3\nQ3,A2"
        },
        {
            testID: "3",
            studyID: "67890",
            dateOfSubmission: "2023-09-04T11:09:28.000Z",
            age: 40,
            gender: "Other",
            ethnicity: "Hispanic",
            answers: "Q1,A3\nQ2,A1\nQ3,A4"
        },
        {
            testID: "4",
            studyID: "67890",
            dateOfSubmission: "2023-09-04T11:09:28.000Z",
            age: 35,
            gender: "Male",
            ethnicity: "African American",
            answers: "Q1,A3\nQ2,A1\nQ3,A4"
        }
    ];

    const [results, setResults] = useState(dummyResults);
    const [selected, setSelected] = useState([]);
    const [studyIDFilter, setStudyIDFilter] = useState('');
    const [ageFilter, setAgeFilter] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [ethnicityFilter, setEthnicityFilter] = useState('');


    useEffect(() => {
        // Fetch the data from the server when the component mounts
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found!');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/results', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setResults(response.data);
            } catch (error) {
                console.error('Error fetching results:', error);
            }
        };

        fetchData();
    }, []);

    const handleSelect = (index) => {
        const newSelected = [...selected];
        const selectedIndex = selected.indexOf(index);
        if (selectedIndex === -1) {
            newSelected.push(index);
        } else {
            newSelected.splice(selectedIndex, 1);
        }
        setSelected(newSelected);
    };

    // Function to handle select all checkboxes
    const handleSelectAll = () => {
        if (selected.length === results.length) {
            // Deselect all if all are selected
            setSelected([]);
        } else {
            // Select all otherwise
            setSelected(results.map((_, index) => index));
        }
    };

    // Count filter matches
    const countMatches = (filterField, filterValue) => {
        return results.filter((result) => result[filterField] === filterValue).length;
    };

    const ageGroups = Array.from({ length: 10 }, (_, i) => 10 * i);

    const [ageAnchorEl, setAgeAnchorEl] = useState(null);
    const [genderAnchorEl, setGenderAnchorEl] = useState(null);
    const [ethnicityAnchorEl, setEthnicityAnchorEl] = useState(null);

    // Handle Gender Click
    const handleGenderClick = (event) => {
        setGenderAnchorEl(event.currentTarget);
    };

    const handleGenderClose = () => {
        setGenderAnchorEl(null);
    };

    // Handle Ethnicity Click
    const handleEthnicityClick = (event) => {
        setEthnicityAnchorEl(event.currentTarget);
    };

    const handleEthnicityClose = () => {
        setEthnicityAnchorEl(null);
    };

    const handleAgeClick = (event) => {
        setAgeAnchorEl(event.currentTarget);
    };

    const handleAgeClose = () => {
        setAgeAnchorEl(null);
    };



    return (
        <ThemeProvider theme={theme}>
            <div className="app-container">
                <div className="sidebar">
                    <SidebarMenu />
                </div>
                <div className="content">
                    <NavigationBar />
                    <h6 className="user-results-heading">User Results</h6>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <DownloadCSV selected={selected} results={results} />
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ textAlign: "center" }}>
                                        <Checkbox
                                            checked={selected.length === results.length}
                                            indeterminate={selected.length > 0 && selected.length < results.length}
                                            onChange={handleSelectAll}
                                        />
                                    </TableCell>
                                    <TableCell>Test ID</TableCell>
                                    <TableCell>
                                        <TextField
                                            label="Filter by Study ID"
                                            value={studyIDFilter}
                                            onChange={(e) => setStudyIDFilter(e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>Date of Submission</TableCell>
                                    <TableCell>
                                        Age
                                        <IconButton size="small" onClick={handleAgeClick}>
                                            <FilterListIcon fontSize="inherit" />
                                        </IconButton>
                                        <Menu
                                            anchorEl={ageAnchorEl}
                                            open={Boolean(ageAnchorEl)}
                                            onClose={handleAgeClose}
                                        >
                                            <MenuItem value="" onClick={() => { setAgeFilter(''); handleAgeClose(); }}><em>None</em></MenuItem>
                                            {ageGroups.map((ageGroup, index) => (
                                                <MenuItem key={index} value={ageGroup} onClick={() => { setAgeFilter(ageGroup); handleAgeClose(); }}>
                                                    {`${ageGroup}-${ageGroup + 9}`} ({countMatches("age", ageGroup)})
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </TableCell>
                                    <TableCell>
                                        Gender
                                        <IconButton size="small" onClick={(e) => handleGenderClick(e)}>
                                            <FilterListIcon fontSize="inherit" />
                                        </IconButton>
                                        <Menu
                                            anchorEl={genderAnchorEl}
                                            open={Boolean(genderAnchorEl)}
                                            onClose={handleGenderClose}
                                        >
                                            <MenuItem value="" onClick={() => { setGenderFilter(''); handleGenderClose(); }}><em>None</em></MenuItem>
                                            <MenuItem value="Male" onClick={() => { setGenderFilter('Male'); handleGenderClose(); }}>Male ({countMatches("gender", "Male")})</MenuItem>
                                            <MenuItem value="Female" onClick={() => { setGenderFilter('Female'); handleGenderClose(); }}>Female ({countMatches("gender", "Female")})</MenuItem>
                                            <MenuItem value="Other" onClick={() => { setGenderFilter('Other'); handleGenderClose(); }}>Other ({countMatches("gender", "Other")})</MenuItem>
                                        </Menu>
                                    </TableCell>

                                    <TableCell>
                                        Ethnicity
                                        <IconButton size="small" onClick={(e) => handleEthnicityClick(e)}>
                                            <FilterListIcon fontSize="inherit" />
                                        </IconButton>
                                        <Menu
                                            anchorEl={ethnicityAnchorEl}
                                            open={Boolean(ethnicityAnchorEl)}
                                            onClose={handleEthnicityClose}
                                        >
                                            <MenuItem value="" onClick={() => { setEthnicityFilter(''); handleEthnicityClose(); }}><em>None</em></MenuItem>
                                            <MenuItem value="Caucasian" onClick={() => { setEthnicityFilter('Caucasian'); handleEthnicityClose(); }}>Caucasian ({countMatches("ethnicity", "Caucasian")})</MenuItem>
                                            <MenuItem value="Asian" onClick={() => { setEthnicityFilter('Asian'); handleEthnicityClose(); }}>Asian ({countMatches("ethnicity", "Asian")})</MenuItem>
                                            <MenuItem value="Hispanic" onClick={() => { setEthnicityFilter('Hispanic'); handleEthnicityClose(); }}>Hispanic ({countMatches("ethnicity", "Hispanic")})</MenuItem>
                                            <MenuItem value="Other" onClick={() => { setEthnicityFilter('Other'); handleEthnicityClose(); }}>Other ({countMatches("ethnicity", "Other")})</MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {results
                                    .filter((result) => {
                                        return (
                                            (!studyIDFilter || result.studyID.includes(studyIDFilter)) &&
                                            (!ageFilter || result.age === Number(ageFilter)) &&
                                            (!genderFilter || result.gender === genderFilter) &&
                                            (!ethnicityFilter || result.ethnicity === ethnicityFilter)
                                        );
                                    })
                                    .map((result, index) => (
                                        <TableRow key={index}>
                                            <TableCell style={{ textAlign: "center" }}>
                                                <Checkbox
                                                    checked={selected.includes(index)}
                                                    onChange={() => handleSelect(index)}
                                                />
                                            </TableCell>
                                            <TableCell>{result.testID}</TableCell>
                                            <TableCell>{result.studyID}</TableCell>
                                            <TableCell>{new Date(result.dateOfSubmission).toLocaleDateString()}</TableCell>
                                            <TableCell>{result.age}</TableCell>
                                            <TableCell>{result.gender}</TableCell>
                                            <TableCell>{result.ethnicity}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </ThemeProvider>
    );
};
export default Results;
