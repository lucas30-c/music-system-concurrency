import React, { useState } from "react";
import { Button, createTheme, TextField, ThemeProvider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "@/utils/axios";

import "./reset.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  if (!email) {
    navigate('/home');
    return;
  }
  const theme = createTheme({
      palette: {
          primary: {
              main: '#003f7d'
          }
      }
  });

  const verify = async () => {
    try {
      const payload = { password, email };
      await axios.post('/api/resetPassword', payload);
      navigate('/home');
    } catch (err) {
        console.log('err while forgot send email', err);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="reset-password">
        <div className="reset-title">Reset Password</div>
        <div className="reset-email-input">
            <TextField label='New password' margin='normal' placeholder="Enter your new password" type="password" onChange={e => setPassword(e.target.value)} fullWidth required />
        </div>
        <div className="reset-email-input">
            <TextField label='Confirm password' margin='normal' placeholder="Re-enter your new password" type="password" onChange={e => setConfirmPassword(e.target.value)} fullWidth required />
        </div>
        <div className="send-btn">
          <Button variant="contained" onClick={verify} disabled={!password || !confirmPassword || password !== confirmPassword}>Update Password</Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ResetPassword;
