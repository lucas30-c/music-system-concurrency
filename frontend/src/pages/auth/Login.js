import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
    Paper,
    Avatar,
    TextField,
    Button,
    createTheme,
    ThemeProvider,
    Tabs,
    Tab,
    Link,
    Snackbar,
    Alert,
    Typography, AppBar,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";

import axios from "@/utils/axios";
import { setToken } from "../../utils/auth";
import { getRole } from "../../utils/getRole";

import './login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const [snackbarState, setSnackbarState] = useState({
        open: false,
        text: '',
        vertical: 'top',
        horizontal: 'center',
        sx: {},
        severity: 'success'
    });
    const [timeBegin, setTimeBegin] = useState();
    const [timeRemain, setTimeRemain] = useState();
    const navigate = useNavigate();
    const theme = createTheme({
        palette: {
            primary: {
                main: '#003F7D',
            },
            secondary: {
                main: '#FD7702',
            }
        },
    
    })
    const paperstyle = {
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '400px',
        width: '300px',
        marginLeft: '50px',
        marginRight: '50px',
        background: '#e2f1ff',
        position: 'relative'
    }
    const [value, setValue] = useState(0);

    const handleLogin = async () => {
        try {
            setLoading(true);
            let payload = {};
            if (value === 0) {
                if (!username || !password) {
                    setSnackbarState({
                        ...snackbarState,
                        open: true,
                        text: 'Please input username and password.',
                        sx: { top: 100 },
                        severity: 'error'
                    });
                    return;
                }
                payload = { username, password };
            }
            if (value === 1) {
                if (!email || !code) {
                    setSnackbarState({
                        ...snackbarState,
                        open: true,
                        text: 'Please input email and code.',
                        sx: { top: 100 },
                        severity: 'error'
                    });
                    return;
                }
                payload = { email, code };
            }
            const response = await axios.post('api/login', payload);
            const token = response.data.token;
            
            const role = getRole(token)

            if (role === 'Admin') {
                navigate('/admin');
                setToken(token);
                console.log("Logged in!");
                console.log('User is an admin');
            } 
            else if(role === 'Participant') {
                navigate('/pthome');
                setToken(token);
                console.log("Logged in!");
                console.log('User is a Participant');
            }

            //navigate to participant home upon succesful login
        } catch (error) {
            console.error("Error during login:", error);
        }finally{
            setLoading(false)
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            const remain = 60 - ((new Date() - timeBegin) / 1000).toFixed(0);
            if (remain < 1) {
                setTimeBegin();
                setTimeRemain(0);
                clearInterval(intervalId);
                return;
            }
            setTimeRemain(remain);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeBegin]);

    const sendEmail = async () => {
        if (!email) {
            setSnackbarState({
                ...snackbarState,
                open: true,
                text: 'Please input email',
                sx: { top: 100 },
                severity: 'error'
            });
            return;
        }
        try {
            await axios.post('/api/sendmail', { type: 'login', email });
            setSnackbarState({
                ...snackbarState,
                open: true,
                text: 'Email sent.',
                severity: 'success',
            });
            setTimeBegin(new Date());
        } catch (err) {
            console.log('err while send login email', err);
        }
    }

    const loadingScreen = () => {
        if (loading) {
            return <CircularProgress />

        }
    }

    const handleChange = (_event, newValue) => {
        setValue(newValue);

    };
    const a11yProps = (index) => ({
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    });
    return (
        <>
        {loading ? loadingScreen():
            <ThemeProvider theme={theme}>
                    <Grid>
                        <Paper elevation={10} style={paperstyle}>
                            <Grid align="center">
                                <Avatar sx={{ bgcolor: "#003F7D", marginBottom: "5px" }}>

                                    <LoginIcon />

                                </Avatar>
                                <Typography>
                                    Synesthesia
                                </Typography>

                            </Grid>
                            <Tabs value={value} onChange={handleChange}>
                                <Tab label="By Username" {...a11yProps(0)} />
                                <Tab label="By Email" {...a11yProps(1)} />
                            </Tabs>
                            <div
                                role="tabpanel"
                                hidden={value !== 0}
                                id={`simple-tabpanel-${0}`}
                                aria-labelledby={`simple-tab-${0}`}
                            >
                                <TextField label='Username' margin='normal' onChange={e => setUsername(e.target.value)} fullWidth required />
                                <TextField label='Password' margin='normal' type='password' onChange={e => setPassword(e.target.value)} fullWidth required />
                            </div>
                            <div
                                role="tabpanel"
                                hidden={value !== 1}
                                id={`simple-tabpanel-${1}`}
                                aria-labelledby={`simple-tab-${1}`}
                            >
                                <TextField label='Email' margin='normal' onChange={e => setEmail(e.target.value)} fullWidth required />
                                <Grid container spacing={2}>
                                    <Grid item md={8}>
                                        <TextField label='Code' margin='normal' type="email" onChange={e => setCode(e.target.value)} fullWidth required />
                                    </Grid>
                                    <Grid item md={4} className="send-btn">
                                        <Button color='primary' variant="contained" disabled={!email || timeRemain > 0} onClick={sendEmail}>{timeRemain > 0 ? timeRemain : 'Send'}</Button>
                                    </Grid>
                                </Grid>
                            </div>
                            <Button type='submit' color='primary' variant="contained" style={{ margin: '30px' }} onClick={handleLogin}>Log in</Button>
                            <div
                                role="tabpanel"
                                hidden={value !== 0}
                                id={`extra-tabpanel-${0}`}
                                aria-labelledby={`extra-tab-${0}`}
                                style={{ position: 'absolute', bottom: 10 }}
                            >
                                <Link style={{ cursor: 'pointer' }} underline="hover" href="/forgot">Forgot password?</Link>
                            </div>
                        </Paper>

                    </Grid>
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
        
        }
            
        </>

    );
};

export default Login;
