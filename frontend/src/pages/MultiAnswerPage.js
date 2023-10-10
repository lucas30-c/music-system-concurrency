import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PAS.css';
import MusicPlayer from '../components/MusicPlayer';
import PaintApp from '../components/PaintApp';
import next from '../next.png';
import NavigationBar from '../components/NavigationBar';
import { Fab, Toolbar, TextField, Paper, Container, IconButton, Collapse, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BrushIcon from '@mui/icons-material/Brush';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import Palette from '@mui/icons-material/Palette';
import GifBox from '@mui/icons-material/GifBox';
import EmojiEmotions from '@mui/icons-material/EmojiEmotions';
import MarkAsDoneButton from '../components/MarkAsDoneButton';
import Grid from '@mui/material/Unstable_Grid2';

import TopNavLayout from '../components/pageLayout';

function MultiAnswerPage() {
    const [openedComponent, setOpenedComponent] = useState('');
    const [paintAppStatus, setPaintAppStatus] = useState('');
    const [textFieldStatus, setTextFieldStatus] = useState('');
    const [currentTestId, setCurrentTestId] = useState(0);
    const [allToolsUsed, setAllToolsUsed] = useState(false);
    const [prevTestId, setPrevTestId] = useState(0);
    const [isDone, setIsDone] = useState(false);
    const [isPaintAppDone, setIsPaintAppDone] = useState(false);
    const [isTextFieldDone, setIsTextFieldDone] = useState(false);
    const [resetPaint, setResetPaint] = useState(false);
    const [textContent, setTextContent] = useState('');
    const [currentCanvasData, setCurrentCanvasData] = useState('');
    const [canvasData, setCanvasData] = useState([]);
    const [textContents, setTextContents] = useState([]);



    useEffect(() => {
        //     if (paintAppStatus === 'interacting' || textFieldStatus === 'interacting') {
        //         setIsDone(false);
        //     }
        // }, [paintAppStatus, textFieldStatus]);
  
        if (currentTest.tools.every(tool => toolsDict[tool] === 'finished')) {
            setAllToolsUsed(true);
        } else {
            setAllToolsUsed(false);
        }
        console.log(currentTestId)
    }, [isPaintAppDone, isTextFieldDone, resetPaint]);

    useEffect(() => {
        setIsPaintAppDone(false);
        setIsTextFieldDone(false);
    }, [currentTestId]);


    const getBoxStyle = (status) => {
        if (status === 'interacting') return { backgroundColor: 'yellow' };
        if (status === 'finished') return { backgroundColor: 'lightgreen' };
        return {};
    };

    const handleComponentToggle = (componentName) => {
        if (openedComponent === componentName) {
            setOpenedComponent('');
        } else {
            setOpenedComponent(componentName);
        }
    };

    const handleCanvasResult = () => {
        const canvasEle = document.getElementById('paintCanvas');
        setCurrentCanvasData(canvasEle.toDataURL());
    }

    // Change the status for the Paint App and reset the 'isDone' flag if the user starts interacting again
    const handlePaintAppStatusChange = async (status) => {
        setPaintAppStatus(status);
        if (status === 'interacting' && isPaintAppDone) {
            setIsPaintAppDone(false);
        }
    };

    // Change the status for the Text Field and reset the 'isDone' flag if the user starts interacting again
    const handleTextFieldStatusChange = (status) => {
        setTextFieldStatus(status);
        if (status === 'interacting' && isTextFieldDone) {
            setIsTextFieldDone(false);
        }
    };

    const getMessage = () => {
        if (openedComponent === '') {
            if (allToolsUsed) {
                return "You have completed all mandatory answer formats. Feel free to complete the optional formats or press next to continue to the next song.";
            } else if (paintAppStatus === 'interacting' || textFieldStatus === 'interacting') {
                return "You have not completed all mandatory answer formats.";
            } else {
                return "Click on any answer format icon above to start."
            }
        }
        return '';
    };

    const getCanvasImageData = () => {
        const canvas = document.getElementById('paintCanvas');
        return canvas.toDataURL();
    };

    

    const audioTests = [
        //dummy datababse tests, you can add more if you like
        {
            id: 1,
            audioURL: 'https://res.cloudinary.com/dtqu0gyvg/video/upload/v1695734060/initial-audio/audio1.mp3',
            tools: ['canvas', 'text']
        },
        {
            id: 2,
            audioURL: 'https://res.cloudinary.com/dtqu0gyvg/video/upload/v1695734043/initial-audio/audio2.mp3',
            tools: ['text']
        }
    ];

    const currentTest = audioTests[currentTestId]
    const navigate = useNavigate();

    const handleNextTest = () => {
        const canvasDataResult = [...canvasData];
        if (isPaintAppDone) {
            canvasDataResult[currentTestId] = currentCanvasData;
        }
        setCanvasData(canvasDataResult);
        const textContentsResult = [...textContents];
        if (isTextFieldDone) {
            textContentsResult[currentTestId] = textContent;
        }
        setTextContents(textContentsResult);
        if (currentTestId < audioTests.length - 1) {
            setCurrentTestId(prevTestId => prevTestId + 1)
            setAllToolsUsed(false)
            setPaintAppStatus('')
            setTextFieldStatus('')
            setTextContent('')
            setResetPaint(true)
        }
        else {
            // test is finished, show congrats page or a dialog or smth
            navigate('./share', { state: { canvasData: canvasDataResult, audioTests, textContents: textContentsResult } });
        }
    };

    const allToolsUsedForTest = (tools) => {
        //check if all the tools in the list of tools that need to be used for the current test is in status "finished"
        return tools.every(tool => toolsDict[tool] === 'finished');
    };



    const toolsDict = {
        // mapping tools name to the status of the tools
        canvas: paintAppStatus,
        text: textFieldStatus
    };

    return (
        <TopNavLayout>
            <Toolbar />
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Typography align="center" style={{
                    marginTop: "10px", fontSize: "20px", color: "lightgrey"
                }}>
                    Audio {currentTestId + 1} out of {audioTests.length}
                </Typography>
                <Paper elevation={1} sx={{ paddingLeft: "20px", paddingRight: "20px", margin: "20px" }}>
                    <MusicPlayer audioSource={currentTest.audioURL} />
                </Paper>
            </Container>

            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Grid container direction={'row'} justifyContent={'center'} columnSpacing={1} marginBottom={1} >
                    {/*Added grid here for each icon so theres a bit of spacing between them, u can adjust columnspacing*/}
                    
                    <Grid>
                        <div style={{ position: 'relative' }}>
                            <IconButton
                                onClick={() => handleComponentToggle('textField')}
                                style={{ ...getBoxStyle(textFieldStatus), borderRadius: '8px' }}
                            >
                                <TextFieldsIcon />
                            </IconButton>
                            <span style={{ color: 'red', position: 'absolute', top: '0', right: '2px' }}>*</span>
                        </div>
                    </Grid>
                    <Grid>
                        <div style={{ position: 'relative' }}>
                            <IconButton
                                onClick={() => handleComponentToggle('paintApp')}
                                style={{ ...getBoxStyle(paintAppStatus), borderRadius: '8px' }}
                            >
                                <BrushIcon  />
                            </IconButton>
                            
                            {currentTest.tools.includes("canvas") ? <span style={{ color: 'red', position: 'absolute', top: '0', right: '2px' }}>*</span> : null}
                            
                        </div>
                    </Grid>
                    <Grid>
                        <IconButton>
                            <Palette />
                        </IconButton>
                    </Grid>

                    <Grid>
                        <IconButton>
                            <GifBox />
                        </IconButton>
                    </Grid>
                    <Grid>
                        <IconButton>
                            <EmojiEmotions />
                        </IconButton>
                    </Grid>
                </Grid>

                {
                    openedComponent === '' && (
                        <Typography variant="h7" align="center" gutterBottom style={{ marginTop: "80px" }}>
                            {getMessage()}
                            <br />
                            <br />
                            The red asterisk <span style={{ color: 'red' }}>*</span> indicates a mandatory answer format to complete.
                        </Typography>
                    )
                }

                <Collapse in={openedComponent === 'paintApp'}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <PaintApp onStatusChange={handlePaintAppStatusChange} updateResult={handleCanvasResult} shouldReset={resetPaint} onResetComplete={() => setResetPaint(false)} />
                        <MarkAsDoneButton
                            onClick={() => {
                                if (isPaintAppDone) {
                                    setPaintAppStatus('interacting');
                                    setIsPaintAppDone(false);
                                } else {
                                    setPaintAppStatus('finished');
                                    setIsPaintAppDone(true);
                                }
                                setIsDone(isPaintAppDone && isTextFieldDone);
                                const canvasEle = document.getElementById('paintCanvas');
                                setCurrentCanvasData(canvasEle.toDataURL());
                            }}
                            isDone={isPaintAppDone}
                        />
                    </div>
                </Collapse>

                <Collapse in={openedComponent === 'textField'}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField
                            value={textContent}
                            onChange={(e)=> setTextContent(e.target.value)}
                            onFocus={() => handleTextFieldStatusChange('interacting')}
                            multiline
                            variant="outlined"
                            fullWidth
                            //set initial number of rows
                            rows={12}
                            InputProps={{
                                style: {
                                    minHeight: '300px',
                                    maxHeight: '300px',
                                    minWidth: '700px',
                                    maxWidth: '700px',
                                    //automatically adds scrolling
                                    overflowY: 'auto',
                                    paddingTop: '0',
                                    paddingBottom: '0'
                                },
                            }}
                        />
                        <MarkAsDoneButton
                            onClick={() => {
                                if (isTextFieldDone) {
                                    setTextFieldStatus('interacting');
                                    setIsTextFieldDone(false);
                                } else {
                                    setTextFieldStatus('finished');
                                    setIsTextFieldDone(true);
                                }
                                setIsDone(isPaintAppDone && isTextFieldDone);

                            }}
                            isDone={isTextFieldDone}
                        />
                    </div>
                </Collapse>
            </Container>

            {/*new button, disabled if not all tools are used, u can mess around with the position if u like, rn it just stays fixed at the bottom right*/}s
            <Button
                variant="contained"
                disabled={!allToolsUsed}
                style={{
                    position: "fixed",
                    bottom: "40px",
                    right: "40px",
                    backgroundColor: allToolsUsed ? "green" : "grey",
                }}
                onClick={handleNextTest}
            >
                Next
            </Button>
        </TopNavLayout>
    );
}

export default MultiAnswerPage;
