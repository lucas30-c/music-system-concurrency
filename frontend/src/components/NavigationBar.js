import React, { useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { getRole } from '@/utils/getRole';
import { getToken, clearToken } from "@/utils/auth";
import axios from "@/utils/axios";

const NavigationBar = () => {

  const token = getToken();
  const isSignedIn = !!token;
  //console.log('====isSignedIn', isSignedIn);
  const role = getRole(token);
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.get('/api/logout');
    } catch (err) {
      console.error('logout api error, goto login directly', err);
    }
    clearToken();
    console.log("Logged out!")
    navigate('/home')
  }

  const determinePath = () => {
    //console.log(role)
    if (role === 'Admin') {
        return '/admin';
    } else if (role === 'Participant') {
        return '/pthome';
    }
    return '/home'; // default path
};

const path = determinePath();


  return (
    <>
      <AppBar position="fixed" sx={{bgcolor:"#002347", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ height: '50px', minHeight: '50px !important'}}>
          <Button color="inherit"onClick={() => {setTimeout(() => {window.location.reload();}, 100);}}component={Link} to={path} sx={{ textTransform: 'none' }}>
            <Typography sx={{ fontSize: '24px' }} >Synesthesia</Typography>
          </Button>

          <div style={{ marginLeft: 'auto' }}>
            {/*<Button color="inherit" component={Link} to="/test" sx={{ textTransform: 'none' }}><Typography sx={{ fontSize: '16px' }}>Test</Typography></Button>*/}
            <Button color="inherit" component={Link} to="/resources" sx={{ textTransform: 'none' }}><Typography sx={{ fontSize: '16px' }}>Resources</Typography></Button>

            {isSignedIn ? (
              <>
                <Button color="inherit" onClick={handleLogout} sx={{ textTransform: 'none' }}><Typography sx={{ fontSize: '16px' }}>Sign Out</Typography></Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/signup" sx={{ textTransform: 'none' }}><Typography sx={{ fontSize: '16px' }}>Sign Up</Typography></Button>
                <Button color="inherit" component={Link} to="/home" sx={{ textTransform: 'none' }}><Typography sx={{ fontSize: '16px' }}>Sign In</Typography></Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar >
    </>
  );
};

export default NavigationBar;
