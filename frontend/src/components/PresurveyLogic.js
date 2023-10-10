import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Paper,
  Avatar,
  TextField,
  Button,
  createTheme,
  ThemeProvider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import SurveyIcon from "@mui/icons-material/Assignment"; // You can change this icon
import { useLocation, useNavigate } from "react-router-dom";

import axios from "@/utils/axios";

const theme = createTheme({
  palette: {
    primary: {
      main: '#003f7d',
    },
  },
});

const paperstyle = {
  padding: 20,
  height: "500px",
  width: "50%",
  margin: "220px auto",
  background: "#E4E4FC",
};

const PresurveyLogic = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    ethnicity: "",
  });

  const genderOptions = ["Male", "Female", "Other"];
  const ethnicityOptions = [
    "Caucasian",
    "Asian",
    "African American",
    "Hispanic",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      //print form results to console
      console.log("Form data submitted successfully:", formData);

      const response = await axios.post(
        "/api/presurvey",
        {...formData, ...(email ? { email } : {})},
      );

      // Log the response from the server
      console.log("Server response:", response.data);
      setOpen(true);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      // Reset the form
      name: "",
      age: "",
      gender: "",
      ethnicity: "",
    });
    navigate('/home');
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid>
        <Paper elevation={10} style={paperstyle}>
          <Grid align="center">
            <Avatar sx={{ bgcolor: "#003f7d" }}>
              <SurveyIcon />
            </Avatar>
            <h2>Presurvey</h2>
          </Grid>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              fullWidth
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              fullWidth
              required
            >
              {genderOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Ethnicity</InputLabel>
            <Select
              label="Ethnicity"
              name="ethnicity"
              value={formData.ethnicity}
              onChange={handleChange}
              fullWidth
              required
            >
              {ethnicityOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid container spacing={2}>
            <Grid item xs={4} xsOffset={4}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={{ marginTop: "20px", width: '100%' }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{"Submission Successful"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Congrats! Your information has been recorded.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Grid>
    </ThemeProvider>
  );
};

export default PresurveyLogic;
