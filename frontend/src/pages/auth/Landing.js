import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Typography, Paper, Container, Grid, } from '@mui/material';

import Login from './Login'
import '../../landing.css';
import NavigationBar from '../../components/NavigationBar';

const Landing = () => {

    const items = [
        {
            title: 'What is Synesthesia?',
            content: "Synesthesia (British spelling synaesthesia) is a rare trait that gives rise to a type of 'merging of sensations'. Some synaesthetes see colours when they hear music, for example. For other synaesthetes, colours might attach to letters, numbers or words.",
        },
        {
            title: 'Are you a Synesthete?',
            content: "Not sure if you're a synesthete? Answer a few preview questions to find out! If you think you are a synesthete, please register here to begin with the questionnaire.",
        },
        {
            title: 'Are you a Synesthesia Researcher?',
            content: 'If you are a researcher, you may direct your synesthetic subjects to this site and ask them to include your email address when they register.',
        },
    ];
    const Item = ({ title, content }) => (
        <Paper elevation={3} className='info-content'>
            <Typography style={{ marginBottom: "20px" }} variant="h5">{title}</Typography>
            <Typography variant="body1">{content}</Typography>
        </Paper>
    );


    return (
        <div className="landing-page-container">
            <NavigationBar />
            <div className="background-circles">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
            </div>
            <Container fixed>
                <Grid container className="content-container">
                    <Grid item xs={12} md={6}>
                        <Carousel stopAutoPlayOnHover navButtonsAlwaysInvisible interval={5000}>
                            {items.map((item, index) => (
                                <Item key={index} title={item.title} content={item.content} />
                            ))}
                        </Carousel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Login />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Landing;
