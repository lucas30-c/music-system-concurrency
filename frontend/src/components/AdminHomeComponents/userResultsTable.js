import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import DownloadCSV from '../DownloadCSV'; // path may vary
import Paper from '@mui/material/Paper';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Checkbox,
    TextField
} from '@mui/material';

const UserResultsTable = ({
    results = [],
    selected,
    handleSelect,
    handleSelectAll,
    studyIDFilter,
    setStudyIDFilter,
    ageFilters,
    setAgeFilters,
    genderFilters,
    setGenderFilters,
    ethnicityFilters,
    setEthnicityFilters,
    countFilterApplied,
    renderFilterMenu,
    AGEGROUPS,
    GENDERS,
    ETHNICITIES
}) => {

    const [ageAnchorEl, setAgeAnchorEl] = useState(null);
    const [genderAnchorEl, setGenderAnchorEl] = useState(null);
    const [ethnicityAnchorEl, setEthnicityAnchorEl] = useState(null);
    const [ageFilter, setAgeFilter] = useState(null);
    const [genderFilter, setGenderFilter] = useState(null);
    const [ethnicityFilter, setEthnicityFilter] = useState(null);

    return (
        <div>
            <div className="header-container">
                <h6 className="list-heading">User Results</h6>
                <div className="download-button-container">
                    <DownloadCSV selected={selected} results={results} />
                </div>
            </div>
            <div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#ececec' }}>
                                <TableCell style={{ textAlign: "center" }}>
                                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                        <Checkbox
                                            checked={selected.length === results.length}
                                            indeterminate={selected.length > 0 && selected.length < results.length}
                                            onChange={handleSelectAll}
                                        />
                                        <ArrowDropDownIcon style={{ marginLeft: '-12px' }} />
                                    </div>
                                </TableCell>
                                <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>Username</TableCell>
                                <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>Email</TableCell>
                                <TableCell>
                                    <TextField
                                        label="Study ID:"
                                        value={studyIDFilter}
                                        onChange={(e) => setStudyIDFilter(e.target.value)}
                                        size="small"
                                        sx={{ backgroundColor: 'white', borderRadius: '4px' }}
                                        InputLabelProps={{
                                            className: 'textfield',
                                            sx: {
                                                fontSize: "16px",
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                                    Age {ageFilters.length > 0 && `(${countFilterApplied(ageFilters)})`}
                                    {renderFilterMenu("age", setAgeFilter, ageFilters, setAgeFilters, ageAnchorEl, setAgeAnchorEl, AGEGROUPS)}
                                </TableCell>
                                <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                                    Gender {genderFilters.length > 0 && `(${countFilterApplied(genderFilters)})`}
                                    {renderFilterMenu("gender", setGenderFilter, genderFilters, setGenderFilters, genderAnchorEl, setGenderAnchorEl, GENDERS)}

                                </TableCell>
                                <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                                    Ethnicity {ethnicityFilters.length > 0 && `(${countFilterApplied(ethnicityFilters)})`}
                                    {renderFilterMenu("ethnicity", setEthnicityFilter, ethnicityFilters, setEthnicityFilters, ethnicityAnchorEl, setEthnicityAnchorEl, ETHNICITIES)}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results
                                .filter((result) => {
                                    const ageRange = `${Math.floor(result.age / 10) * 10}-${Math.floor(result.age / 10) * 10 + 9}`;
                                    return (
                                        result.user && result.user._id &&
                                        (!studyIDFilter || (result.studyId && result.studyId.includes(studyIDFilter))) &&
                                        (!ageFilters.length || ageFilters.includes(ageRange)) &&
                                        (!genderFilters.length || genderFilters.includes(result.gender)) &&
                                        (!ethnicityFilters.length || ethnicityFilters.includes(result.ethnicity))
                                    );
                                })
                                .map((result, index) => (
                                    <TableRow key={result._id}>
                                        <TableCell style={{ textAlign: "center" }}>
                                            <Checkbox
                                                checked={selected.includes(index)}
                                                onChange={() => handleSelect(index)}
                                            />
                                        </TableCell>
                                        <TableCell>{result.user.username}</TableCell>
                                        <TableCell>{result.user.email}</TableCell>
                                        <TableCell>{result.studyId || 'N/A'}</TableCell>
                                        <TableCell>{result.age}</TableCell>
                                        <TableCell>{result.gender}</TableCell>
                                        <TableCell>{result.ethnicity}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div >
    );
};

export default UserResultsTable;
