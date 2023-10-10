import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Collapse,
  MenuItem,
  Container,
} from "@mui/material";
import DownloadCSV from "../components/DownloadCSV";
import NavigationBar from "../components/NavigationBar";
import SidebarMenu from "../components/SidebarMenu";
import "../ResultsPage.css";
import { TextField, IconButton, Menu } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import IBMPlexSans from "../fonts/IBM_Plex_Sans/IBMPlexSans-Regular.ttf";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import EditIcon from "@mui/icons-material/Edit";

//added by Ahmed
import CollapsibleTable from "../components/TestSettings";
import TestEdit from "../components/TestEdit";

import CircularProgress from "@mui/material/CircularProgress";

import "../index.css";
//import constants
import {
  GENDERS,
  ETHNICITIES,
  AGEGROUPS,
  USERTYPES,
} from "../components/AdminHomeComponents/constants";
import {
  dummyResults,
  dummyUsers,
} from "../components/AdminHomeComponents/dummyData";
import UserResultsTable from "../components/AdminHomeComponents/userResultsTable";
import UserListTable from "../components/AdminHomeComponents/userListTable";
import { getToken } from "../utils/auth";
import { getRole } from "../utils/getRole";

const theme = createTheme({
  palette: {
    primary: {
      main: "#002347",
    },
    secondary: {
      main: "#FF8E00",
    },
  },
  typography: {
    fontFamily: "IBMPlexSans",
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
    MuiCheckbox: {
      styleOverrides: {
        root: {
          // color: '#FF8E00', // this sets the default (unchecked) color
          "&.Mui-checked": {
            color: "#FD7702", // this sets the checked color
          },
        },
      },
    },
  },
});

const Results = () => {
  const [selected, setSelected] = useState([]);
  const [studyIDFilter, setStudyIDFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [ethnicityFilter, setEthnicityFilter] = useState("");
  const [ageFilters, setAgeFilters] = useState([]);
  const [genderFilters, setGenderFilters] = useState([]);
  const [ethnicityFilters, setEthnicityFilters] = useState([]);

  const [selectedTable, setSelectedTable] = useState(null);

  const [users, setUsers] = useState([]);
  const [privilegeFilter, setPrivilegeFilter] = useState("");
  const [privilegeFilters, setPrivilegeFilters] = useState([]);
  const [results, setResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1); // Initialize the current page to 1
  const [usersPerPage, setUsersPerPage] = useState(10); // The number of users to display per page

  const [loading, setLoading] = useState(false);

  const role = getRole(getToken());

  useEffect(() => {
    // Fetch users when selectedTable changes to 'User List'

    if (selectedTable === "User Results") {
      const token = getToken();
      if (!token) {
        console.error("No token found!");
        return;
      }

      const fetchResults = async () => {
        try {
          setLoading(true);
          const response = await axios.get("api/presurvey/list", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data.docs);
          setResults(response.data.docs);
        } catch (error) {
          console.error("Error fetching survey results:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchResults();
    }

    if (selectedTable === "User List") {
      const token = getToken();
      //print token
      if (!token) {
        console.error("No token found!");
        return;
      }

      const fetchUsers = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`api/user/list`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          // console.log(response.data.docs);
          setUsers(response.data.docs);
        } catch (error) {
          console.error("Error fetching users:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }
  }, [selectedTable, currentPage, usersPerPage]);

  const handleDelete = async (userId) => {
    try {
      // Assuming you have the JWT token stored in some state or local storage
      const token = getToken();

      // Make the DELETE request
      const response = await axios.delete(`api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("User removed successfully");
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        switch (error.response.status) {
          case 401:
            console.log("Unauthorized");
            break;
          case 403:
            console.log("Forbidden to remove own account");
            break;
          case 500:
            console.log("Error removing user");
            break;
          default:
            console.log("An unknown error occurred");
        }
      }
    }
  };

  const handleEdit = async (userId, newPrivilege) => {
    try {
      // Assuming you have the JWT token stored in some state or local storage
      setLoading(true);
      const token = getToken();

      // Prepare the request body
      const requestBody = {
        role: newPrivilege,
      };

      // Make the PUT request
      const response = await axios.put(
        `api/user/updateRole/${userId}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        //print what role user was updated to
        console.log(response.data.role);
        console.log("User role updated successfully");
        // Update the user role in local state
        setUsers((prevUsers) =>
          prevUsers.map((user) => {
            if (user._id === userId) {
              return { ...user, role: newPrivilege };
            }
            return user;
          })
        );
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        switch (error.response.status) {
          case 403:
            console.log("Forbidden to update own role");
            break;
          case 500:
            console.log("Error saving user role");
            break;
          default:
            console.log("An unknown error occurred");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to handle selecting a checkbox
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
    if (selected.length > 0) {
      // Deselect all if any are selected
      setSelected([]);
    } else {
      // Select all otherwise
      setSelected(results.map((_, index) => index));
    }
  };

  // Count filter matches
  const countMatches = (filterField, filterValue) => {
    if (filterField === "role") {
      return users.filter((user) => user.role === filterValue).length;
    } else if (filterField === "age") {
      const [minAge, maxAge] = filterValue.split("-").map(Number);
      return results.filter(
        (result) => result.age >= minAge && result.age <= maxAge
      ).length;
    }
    return results.filter((result) => result[filterField] === filterValue)
      .length;
  };

  // Toggle filter
  const toggleFilter = (filters, setFilters, value) => {
    const newFilters = filters.includes(value)
      ? filters.filter((f) => f !== value)
      : [...filters, value];
    setFilters(newFilters);
  };

  // Count number of filters applied
  const countFilterApplied = (filters) => filters.length;

  // Filter menu
  const [ageAnchorEl, setAgeAnchorEl] = useState(null);
  const [genderAnchorEl, setGenderAnchorEl] = useState(null);
  const [ethnicityAnchorEl, setEthnicityAnchorEl] = useState(null);
  const [privilegeAnchorEl, setPrivilegeAnchorEl] = useState(null);

  // Render filter menu
  const renderFilterMenu = (
    filter,
    setFilter,
    filters,
    setFilters,
    anchor,
    setAnchor,
    options
  ) => (
    <>
      <IconButton size="small" onClick={(e) => setAnchor(e.currentTarget)}>
        <FilterListIcon fontSize="inherit" />
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            style={{
              fontSize: "0.8rem",
              height: "30px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Checkbox
              checked={filters.includes(option)}
              onChange={() => toggleFilter(filters, setFilters, option)}
            />
            {`${option}`} ({countMatches(filter, option)})
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  const renderTable = () => {
    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      );
    }
    switch (selectedTable) {
      case "User Results":
        return (
          <UserResultsTable
            results={results}
            selected={selected}
            handleSelect={handleSelect}
            handleSelectAll={handleSelectAll}
            studyIDFilter={studyIDFilter}
            setStudyIDFilter={setStudyIDFilter}
            ageFilters={ageFilters}
            setAgeFilters={setAgeFilters}
            genderFilters={genderFilters}
            setGenderFilters={setGenderFilters}
            ethnicityFilters={ethnicityFilters}
            setEthnicityFilters={setEthnicityFilters}
            countFilterApplied={countFilterApplied}
            renderFilterMenu={renderFilterMenu}
            AGEGROUPS={AGEGROUPS}
            GENDERS={GENDERS}
            ETHNICITIES={ETHNICITIES}
          />
        );
      case "User List":
        return (
          <UserListTable
            users={users}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            privilegeFilters={privilegeFilters}
            renderFilterMenu={renderFilterMenu}
            countFilterApplied={countFilterApplied}
            setPrivilegeFilters={setPrivilegeFilters}
            USERTYPES={USERTYPES}
          />
        );
      case "Test Settings":
        return <TestEdit />;
      case "Edit Resources":
        return <div>Render Edit Resources Table Here</div>;
      default:
        return (
          <div>
            <h1 className="list-heading">Welcome to the Admin homepage!</h1>
            <p className="default-body">
              Select an option from navigation menu on the left.
            </p>
          </div>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <div className="sidebar">
          <SidebarMenu
            setSelectedTable={setSelectedTable}
            selectedTable={selectedTable}
          />
        </div>
        <div className="content">
          <NavigationBar />
          {renderTable()}
        </div>
      </div>
    </ThemeProvider>
  );
};
export default Results;
