import React, { useState, useRef, useEffect } from 'react';
import { Button, Grid, Chip, Slider, Box, SvgIcon, Typography } from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const PaintApp = ({ onStatusChange, onResetComplete, shouldReset, updateResult }) => {
    const [drawing, setDrawing] = useState(false);
    const [ctx, setCtx] = useState(null);
    const [currentColor, setCurrentColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);
    const [currentTool, setCurrentTool] = useState('brush');



    const canvasRef = useRef(null);
    const colorInputRef = useRef(null);

    const handleColorChange = (e) => {
        setCurrentColor(e.target.value);
    };

    const handleChipClick = () => {
        colorInputRef.current.click();
    };

    //user is drawing
    const handleMouseDown = () => {
        setDrawing(true);
        onStatusChange('interacting');
    };

    //user is not drawing anymore
    const handleMouseUp = () => {
        setDrawing(false);
        updateResult();
    };


    const draw = (event) => {
        if (!drawing) return;
        if (!ctx) return;

        if (currentTool === 'eraser') {
            ctx.strokeStyle = 'white';
        } else {
            ctx.strokeStyle = currentColor;
        }

        ctx.lineWidth = brushSize;
        ctx.lineCap = "round";

        ctx.lineTo(event.clientX - canvasRef.current.offsetLeft, event.clientY - canvasRef.current.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(event.clientX - canvasRef.current.offsetLeft, event.clientY - canvasRef.current.offsetTop);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        setCtx(context);
        canvas.style.border = '1px solid black';

        if(shouldReset && ctx){
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            onResetComplete();
        }

        canvas.addEventListener('mousedown', () => setDrawing(true));
        canvas.addEventListener('mouseup', () => {
            setDrawing(false);
            if (ctx) {
                ctx.beginPath();
            }
        });

        return () => {
            canvas.removeEventListener('mousedown', () => setDrawing(true));
            canvas.removeEventListener('mouseup', () => setDrawing(false));
        };
    }, [ctx, shouldReset]);

    const exportImage = () => {
        const link = document.createElement('a');
        link.download = 'painting.png';
        link.href = canvasRef.current.toDataURL();
        link.click();
    };

    const buttonClickHandler = (action) => {
        switch (action) {
            case 'brush':
                setCurrentTool('brush');
                break;
            case 'eraser':
                setCurrentTool('eraser');
                break;
            case 'resetCanvas':
                if (ctx) {
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                }
                break;
            default:
                break;
        }
        // Indicate that the user is interacting with the component
        onStatusChange('interacting');
    };

    return (
        <Grid container direction="column" alignItems="center">
            <Grid item>
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={400}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseOut={() => setDrawing(false)}
                    onMouseMove={draw}
                    style={{ backgroundColor: 'white', border: '1px solid black', marginBottom: "10px" }}
                    id="paintCanvas"
                >
                </canvas>
            </Grid>

            <Grid item container direction="row" justifyContent="center" columnSpacing={4}>
                <Grid item>
                    <Box>
                        <Slider
                            value={brushSize}
                            min={1}
                            max={30}
                            onChange={(e, newValue) => setBrushSize(newValue)}
                            sx={{ width: 150 }}
                        />
                        <Typography align="center">
                            Brush Size: {brushSize}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Button startIcon={<BrushIcon />} variant="contained" color="primary" onClick={() => buttonClickHandler('brush')}>
                        Brush
                    </Button>
                </Grid>
                <Grid item>
                    <input
                        ref={colorInputRef}
                        type="color"
                        value={currentColor}
                        onChange={handleColorChange}
                        style={{ display: 'none' }} // Hide the input
                    />
                    <Chip
                        label=""
                        style={{ backgroundColor: currentColor, width: '20px', border: "1px solid black" }}
                        onClick={handleChipClick}
                    />
                </Grid>
                <Grid item>
                    <Button startIcon={
                        <SvgIcon>
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M5.662 23l-5.369-5.365c-.195-.195-.293-.45-.293-.707 0-.256.098-.512.293-.707l14.929-14.928c.195-.194.451-.293.707-.293.255 0 .512.099.707.293l7.071 7.073c.196.195.293.451.293.708 0 .256-.097.511-.293.707l-11.216 11.219h5.514v2h-12.343zm3.657-2l-5.486-5.486-1.419 1.414 4.076 4.072h2.829zm.456-11.429l-4.528 4.528 5.658 5.659 4.527-4.53-5.657-5.657z" /></svg>
                        </SvgIcon>
                    } variant="contained" color="primary" onClick={() => buttonClickHandler('eraser')}>
                        Eraser
                    </Button>
                </Grid>
                <Grid item>
                    <Button startIcon={<RestartAltIcon />} variant="contained" onClick={() => buttonClickHandler('resetCanvas')}>
                        Reset Canvas
                    </Button>
                </Grid>

            </Grid>

        </Grid >
    );

};

export default PaintApp;
