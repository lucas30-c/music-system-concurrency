import React, { useState } from "react";
import { Snackbar } from "@mui/base";
import { Alert, Button, createTheme, TextField, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";

import axios from "@/utils/axios";

import "./index.css";

const ForgotPassword = () => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    text: '',
    vertical: 'top',
    horizontal: 'center',
    sx: {},
    severity: 'success'
  });
  const [email, setEmail] = useState('');
  const theme = createTheme({
    palette: {
      primary: {
        main: '#003f7d'
      }
    }
  });
  const navigate = useNavigate();

  const sendEmail = async () => {
    try {
      const payload = { email, type: 'forget' };
      await axios.post('/api/sendmail', payload);
      navigate('/verify', {
        state: { email, from: 'forgot' }
      });
    } catch (err) {
      console.log('err while forgot send email', err);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="forgot-password">
        <div className="forgot-title">Forgot Password</div>
        <div className="forgot-email-input">
          <TextField label='Email' margin='normal' placeholder="Enter email here for password reset link" type="email" onChange={e => setEmail(e.target.value)} fullWidth required />
        </div>
        <div className="send-btn">
          <Button variant="contained" onClick={sendEmail} disabled={!email}>send code</Button>
        </div>
        <Snackbar
          sx={snackbarState.sx}
          open={snackbarState.open}
          autoHideDuration={6000}
          onClose={() => setSnackbarState({ ...snackbarState, open: false })}
          anchorOrigin={{ vertical: snackbarState.vertical, horizontal: snackbarState.horizontal }}
        >
          <Alert onClose={() => setSnackbarState({ ...snackbarState, open: false })} severity={snackbarState.severity} sx={{ width: '100%' }}>
            {snackbarState.text}
          </Alert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
};

export default ForgotPassword;
