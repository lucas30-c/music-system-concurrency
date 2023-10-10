import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Typography, Paper, Container,Button, Toolbar, CssBaseline, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import NavigationBar from '../components/NavigationBar';
import {Link} from "react-router-dom";

const ptHome = () => {

    const paperstyle = {
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '400px',
        width: '300px',
        background: '#e2f1ff',
        position: 'relative'
    }

    return (
        <div>
            <CssBaseline/>
            <NavigationBar />
            <Toolbar/>
            <div className="background-circles">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
            </div>
            <Container 
                style={{ 
                    height:'80vh',
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    overflow:'hidden'
                }}
                >
                <Box 
                    width={300} 
                    height={200} 
                    border={1} 
                    borderColor="grey.500"
                    display="flex"
                    flexDirection="column"
                >
                    <Button 
                        variant="outlined" 
                        style={{ flexGrow: 1, backgroundColor:"white"}}
                        component={Link}
                        to = "/test/agreement"
                    >
                        Take Test
                    </Button>
                    
                    <Button 
                        variant="outlined" 
                        style={{ flexGrow: 1, backgroundColor:"white"}}
                        onClick={() => console.log('WIP')}
                    >
                        View Past Results
                    </Button>
                </Box>
                </Container>
        </div>
    );
}

export default ptHome;
