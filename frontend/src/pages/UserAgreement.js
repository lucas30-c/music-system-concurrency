/**
 * Adapted from https://mui.com/material-ui/
 */

import React from 'react'
import {
    Typography, Container, FormGroup,
    FormControlLabel, Checkbox, Button
} from '@mui/material'
import {
    UserAgree1, UserAgree2, UserAgree3, UserAgree4,
    UserAgree5, UserAgree6, UserAgree7,
    TestConsent, DataConsent,
} from "../components/AgreementText";
import CssBaseline from "@mui/material/CssBaseline";
import SidebarMenu from "../components/SidebarMenu";
import NavigationBar from "../components/NavigationBar";
import { Link } from "react-router-dom";

export default function UserAgreement() {

    const [checked, setChecked] = React.useState(false)
    const [enable, setEnable] = React.useState();


    // Do something here
    const handleCheck = (event) => {
        setChecked(event.target.checked);
        setEnable(event.target.checked);
        if (checked === false) { // Why does this work this way?
            console.log("I consent!");
        } else {
            console.log("I do not consent!")
        }

    };

    const handleSubmit = () => {
        // Do something
        console.log("Next!");
    }

    const ConsentBox = () => {
        return (
            <FormGroup>
                <FormControlLabel required
                    control={
                    <Checkbox
                        checked={checked}
                        onChange={handleCheck}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />}
                    label={TestConsent}
                    labelPlacement={'start'}
                />
            </FormGroup>
        );
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <div className="NavBar">
                <NavigationBar />
            </div>

            <Container fixed sx={{
                mt: 10
                // ml: 26,
                // width: '100%'
            }}>
                <Container className="Title">
                    <Typography variant={"h3"} align={"center"}>
                        User Agreement
                    </Typography>
                </Container>

                <Container className="Content" fixed sx={{
                    border: 1,
                    borderRadius: '16px',
                    overflow: 'auto',
                    height: 500,
                    mt: 2
                }}>
                    <Typography paragraph={true} sx={{ pt: 2 }}>
                        {UserAgree1}
                    </Typography>
                    <Typography paragraph={true}>
                        {UserAgree2}
                        <br />
                    </Typography>
                    <Typography paragraph={true}>
                        {UserAgree3}
                    </Typography>
                    <Typography paragraph={true}>
                        {UserAgree4}
                    </Typography>
                    <Typography paragraph={true}>
                        {UserAgree5}
                    </Typography>
                    <Typography paragraph={true}>
                        {UserAgree6}
                    </Typography>
                    <Typography paragraph={true} gutterBottom={true}>
                        {UserAgree7}
                    </Typography>
                </Container>

                <Container sx={{
                    mt: 3,
                    pb: 5
                }}>
                    <ConsentBox />

                </Container>



                <Container sx={{
                    pb: 10
                }}>
                    <Button
                        variant="contained"
                        fullWidth={true}
                        disabled={!enable} // Again, why does it work this way?
                        onClick={handleSubmit}
                        component={Link} to={"/test"}
                    >
                        Next
                    </Button>
                </Container>

            </Container>
        </React.Fragment>
    );
}

// export default UserAgreement;
