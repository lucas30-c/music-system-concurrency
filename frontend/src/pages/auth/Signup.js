import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/base";
import { Alert } from "@mui/material";

import axios from "@/utils/axios";

import "./signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const [snackbarState, setSnackbarState] = useState({
      open: false,
      text: '',
      vertical: 'top',
      horizontal: 'center',
      sx: {},
      severity: 'success'
  });
  const navigate = useNavigate();

  const signup = async () => {
    try {
      const payload = {
        email,
        username,
        password,
        role: selectedAccountType,
      };
      if (!email || !username || !password || !selectedAccountType) {
        setSnackbarState({
          ...snackbarState,
          open: true,
          text: 'Please check your data'
        });
        return;
      }
      await axios.post('/api/sendmail', { email, type: 'signup' });
      navigate('/verify', {
        state: { payload, from: 'signup' }
      });
    } catch (err) {
        console.log('err while signup', err);
    }
  }

  return (
    <div className="signup">
      <div className="div">
        <div className="text-wrapper">Sign up</div>
        <p className="have-an-account-with">
          <span className="span">
            Have an account with us already? Sign in{" "}
          </span>
          {/* eslint-disable-next-line */}
          <a className="text-wrapper-2" href="/home">
            here
          </a>
          <span className="span">.</span>
        </p>
        <div className="overlap">
          <div className="text-wrapper-3">Username</div>
          {/* <div className="text-wrapper-4">Enter username here</div> */}
          <input
            className="text-wrapper-4"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username here"
          />
          <div className="rectangle" />
        </div>
        <div className="text-wrapper-5">E-mail</div>
        <label className="overlap-3">
          {/* <div className="text-wrapper-10">Enter e-mail here</div> */}
          <input
            className="text-wrapper-10"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter e-mail here"
          />
          <div className="rectangle-2" />
        </label>

        <div className="text-wrapper-6">Password</div>
        <label className="overlap-group">
          <input
            className="text-wrapper-8"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password here"
          />
          <div className="rectangle-2" />
        </label>
        <div className="text-wrapper-7">Re-enter password</div>
        <div className="overlap-2">
          {/* <div className="text-wrapper-9">Re-enter password here</div> */}
          <input
            className="text-wrapper-9"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password here"
          />
          <div className="rectangle-2" />
        </div>

        <button className="frame" onClick={signup}>
          <div className="text-wrapper-11">Sign up</div>
        </button>
        <div className="text-wrapper-12">Account Type</div>

        <label className="signup-checkbox-label">
          <input
            type="radio"
            className="signup-checkbox"
            value="Participant"
            checked={selectedAccountType === "Participant"}
            onChange={() => setSelectedAccountType("Participant")}
          />
          <span className="text-wrapper-13">Participant</span>
          <div
            className={
              selectedAccountType === "Participant"
                ? "rectangle-3 checked"
                : "rectangle-3"
            }
          />
        </label>

        <label className="signup-checkbox-label">
          <input
            type="radio"
            className="signup-checkbox"
            value="Researcher"
            checked={selectedAccountType === "Researcher"}
            onChange={() => setSelectedAccountType("Researcher")}
          />
          <span className="text-wrapper-14">Researcher</span>
          <div
            className={
              selectedAccountType === "Researcher"
                ? "rectangle-4 checked"
                : "rectangle-4"
            }
          />
        </label>

        <img
          className="line"
          alt="Line"
          src="https://cdn.animaapp.com/projects/64f9373d17f14c6c2342e89c/releases/64f9391ebd600670120c7fbc/img/line-1.svg"
        />
        {/* <div className="rectangle-3" />
        <div className="rectangle-4" /> */}
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
  );
};

export default Signup;
