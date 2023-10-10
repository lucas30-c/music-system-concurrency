import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import React, { useState } from "react";
import {Backdrop, Button, CircularProgress, Container, Grid, TextField, Typography, IconButton, Tooltip, Toolbar, DialogTitle, Dialog} from "@mui/material";
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import CssBaseline from "@mui/material/CssBaseline";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axiosBase from 'axios';

import axios from "@/utils/axios";
import TopNavLayout from '@/components/pageLayout';


export default function ShareWithResearcher() {

    const navigate = useNavigate();
    const location = useLocation();
    const { canvasData, audioTests, textContents } = location.state || {};
    const [studyId, setStudyId] = React.useState("")
    const [checkedPersonalResearch, setCheckedPersonalResearch] = React.useState(false);
    const [checkedPersonalDatabase, setCheckedPersonalDatabase] = React.useState(false);
    const [open, setOpen] = useState(false)
    const [saving, setSaving] = useState(false)
    const [openSaveSuccess, setOpenSaveSuccess] = useState(false)

    // const [enable, setEnable] = React.useState();
    //
    const handleShare = () => {
        console.log(studyId);
        setOpen(true);
    }

    const handleSubmit = async () => {
        setSaving(true);
        const result = { ...(studyId ? {studyId} : {}), answers: {} };
        for (let i = 0; i < audioTests?.length || 0; i++) {
            const canvasDataRow = canvasData?.[i];
            let image = '';
            const text = textContents[i];
            if (canvasDataRow) {
                const { data } = await axios.get('/api/cloudinary/sign', { folder: 'test_results' });
                const formData = new FormData();
                formData.append("file", canvasData[i]);
                formData.append("api_key", data.apikey);
                formData.append("timestamp", data.timestamp);
                formData.append("signature", data.signature);
                formData.append("folder", 'test_results');
                const { data: uploadResult } = await axiosBase.post(
                    'https://api.cloudinary.com/v1_1/dtqu0gyvg/upload',
                    formData,
                );
                console.log(canvasData[i]);
                image = uploadResult.secure_url;
            }
            result.answers[audioTests[i].id] = {
                audio: audioTests[i].audioURL,
                ...(image ? { image } : {}),
                ...(text ? { text } : {}),
            };
        }
        await axios.post('/api/testResult/save', { ...result });
        setSaving(false);
        setOpenSaveSuccess(true);
        navigate('/pthome');
    }

    const handleCheckPersonalResearch = (event) => {
        setCheckedPersonalResearch(event.target.checked);
        // setEnable(event.target.checked);
        if (checkedPersonalResearch === false) { // Why does this work this way?
            console.log("I consent!");
        } else {
            console.log("I do not consent!")
        }
    }

    const handleCheckPersonalDatabase = (event) => {
        setCheckedPersonalDatabase(event.target.checked);
        // setEnable(event.target.checked);
        if (checkedPersonalDatabase === false) { // Why does this work this way?
            console.log("I consent!");
        } else {
            console.log("I do not consent!")
        }
    }


    
    const handleClose = () => {
        setOpen(false);
    }
    
    const handleCloseSaveSuccess = () => {
        setOpenSaveSuccess(false);
    }

    return (
        <TopNavLayout>
            <CssBaseline />
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={saving}
              onClick={() => setSaving(false)}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Dialog open={openSaveSuccess} onClose={handleCloseSaveSuccess}>
                <DialogTitle>
                    <Typography>
                        Results Successfuly Saved
                    </Typography>
                </DialogTitle>
            </Dialog>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    <Typography>
                        Results Successfuly Shared
                    </Typography>
                </DialogTitle>
            </Dialog>
            <Toolbar/>
            <Container fixed sx={{marginTop:5}}>
                <Typography variant={"h4"} align={"center"}>
                    Share Results With Researcher
                </Typography>
                <br/>
                <Typography paragraph={true}>
                    If you have been invited to participate in a research study, enter their study ID here. Otherwise,
                    leave this field blank.
                </Typography>
                <Grid container justifyContent={"center"}>
                    <TextField
                        id={"studyID"}
                        label={"Enter Study ID"}
                        variant={"outlined"}
                        sx={{
                            width: 200
                        }}
                        onChange={(e) => setStudyId(e.target.value)}
                    />
                </Grid>
                <br/>
                <Typography paragraph={true}>
                    I agree to sharing non-identifying personal data with
                    <FormGroup>
                        <FormControlLabel control={
                            <Checkbox
                                checked={checkedPersonalResearch}
                                onChange={handleCheckPersonalResearch}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />}
                                          label={"The research study I am participating in"}
                                          labelPlacement={'end'}
                        />
                        <FormControlLabel control={
                            <Checkbox
                                checked={checkedPersonalDatabase}
                                onChange={handleCheckPersonalDatabase}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />}
                                          label={"The system for other researchers to use"}
                                          labelPlacement={'end'}
                        />
                    </FormGroup>
                </Typography>
                <Typography paragraph={true}>

                </Typography>
                <Typography paragraph={true}>

                </Typography>

                <br/>
                <Container sx={{
                    display:"flex",
                    justifyContent:"center",
                }}>
                    
                    <Button
                        variant="contained"

                        onClick={handleShare}
                        sx={{height:"50px"}}
                    >
                        Share
                    </Button>
                    
                </Container>
                <Tooltip title="Next Page">
                    <IconButton  
                        color="primary"
                        component = {Link}
                        onClick={handleSubmit}
                        style={{
                            position: "fixed",
                            bottom: "30px",
                            right: "30px",
                        }}>
                        <ArrowCircleRightRoundedIcon  sx={{fontSize: '80px'}}/>

                    </IconButton>
                </Tooltip>
            </Container>

        </TopNavLayout>
    );
}
