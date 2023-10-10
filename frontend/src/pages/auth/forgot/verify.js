import React, { useState } from "react";
import { Alert, Button, createTheme, Snackbar, ThemeProvider } from "@mui/material";
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useLocation, useNavigate } from "react-router-dom";

import axios from "@/utils/axios";

import "./verify.css";

const FogotPasswordVerify = () => {
  const location = useLocation();
  const { from, email, payload } = location.state;
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    text: '',
    vertical: 'top',
    horizontal: 'center',
    sx: {},
    severity: 'success'
  });

  const handleChange = (newValue) => {
    setOtp(newValue)
  }
  const signup = async (code) => {
    try {
      await axios.post("/api/signup", { code, ...payload });
      navigate('/presurvey', {
        state: { email: payload.email }
      });
    } catch (err) {
      console.log('signup error', err);
      setSnackbarState({
        ...snackbarState,
        open: true,
        text: 'signup error, please retry again'
      });
    }
  };
  const verify = async (code) => {
    try {
      await axios.post("/api/verifyForForgot", { code, email });
      navigate('/reset', {
        state: { email }
      })
    } catch (err) {
      console.log('reset password verify code error', err);
      setSnackbarState({
        ...snackbarState,
        open: true,
        text: 'verify code error, please retry again'
      });
    }
  };
  const handleComplete = async (code) => {
    switch(from) {
      case 'forgot':
        await verify(code);
        break;
      case 'signup':
        await signup(code);
        break;
      default:
        console.log('unknown verify type', from);
    }
  };
  const theme = createTheme({
      palette: {
          primary: {
              main: '#003f7d'
          }
      }
  })

  return (
    <ThemeProvider theme={theme}>
      <div className="forgot-password-verify">
        <div className="notice-1">Please check your email</div>
        <div className="notice-2">We have sent you a verification code, please check your email</div>
        <div className="notice-3">and fill in the code below</div>
        <div className="inputs">
          <MuiOtpInput value={otp} onChange={handleChange} onComplete={handleComplete} length={6} />
        </div>
        <div className="verify-btn">
          <Button variant="contained" disabled={!otp}>Verify</Button>
        </div>
        <div className="resend-btn">
          <Button variant="text">resend code</Button>
        </div>
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
    </ThemeProvider>
  );
};

export default FogotPasswordVerify;
