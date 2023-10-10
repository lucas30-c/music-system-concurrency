import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import { Paper, Avatar, TextField, Button, createTheme, ThemeProvider } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Navigate, useNavigate } from 'react-router-dom';
import Textbox from './components/Textbox';
import SubmitButton from './components/SubmitButton';

const TextAnswer = () => {
    const [answer, setAnswer] = useState('');  // Fixed useState initialization
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            // const response = await axios.post('http://localhost:5000/submitAnswer', { answer });
            // console.log("Successfully submitted answer:", response.data);
            console.log("Successfully submitted answer:", answer);
        } catch (error) {
            console.error("Error during answer submission:", error);
        }
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#5d5fef',
            },
        },
    });

    const paperstyle = { padding: 20, height: '420px', width: '300px', margin: "100px auto", background: "#E4E4FC" };

    return (
        <ThemeProvider theme={theme}>
            <Grid>
                <Paper elevation={10} style={paperstyle}>
                    <Grid align="center">
                        <Avatar sx={{ bgcolor: "#8D8FF3" }}>
                            <QuestionAnswerIcon />
                        </Avatar>
                        <h2>Can you describe what you see as you listen to the audio?</h2>
                    </Grid>
                    <p>
                        Feel free to describe the audio in as much detail as you like. e.g., key words, the emotions you feel, the images you imagine.
                    </p>
                    <Textbox onChange={e => setAnswer(e.target.value)} />
                    <SubmitButton onClick={handleSubmit} />
                </Paper>
            </Grid>
        </ThemeProvider>
    );
};

export default TextAnswer;