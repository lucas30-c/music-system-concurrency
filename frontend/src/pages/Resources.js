import React from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import NavigationBar from "../components/NavigationBar";
import {Button, Container} from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Typography from "@mui/material/Typography";
import {renderToString} from "react-dom/server";

export default function Resources() {

    const HyperLink = (link) => {
        console.log(renderToString(link))
        return (
            <Button
                target={"_blank"}
                component={"a"}
                href={link.valueOf()}
                endIcon={<OpenInNewIcon />}
                color={"info"}
            >
                Click here
            </Button>
        );
    }

    return (
        <React.Fragment>
            <CssBaseline />

            <NavigationBar />


            <Container className="ResourceLinks" fixed sx={{
                mt: 10
            }}>
                <Typography variant={"h4"}>
                    Quick Links
                </Typography>
                <br/>
                <Typography variant={"h6"}>
                    Wikipedia
                </Typography>
                <Typography variant={"body1"}>
                    Learn more about synaesthesia
                    <Button
                        target={"_blank"}
                        component={"a"}
                        href={"https://en.wikipedia.org/wiki/Synesthesia"}
                        endIcon={<OpenInNewIcon />}
                        color={"info"}
                    >
                        Wikipedia
                    </Button>
                </Typography>
                <br/>
                <Typography variant={"h6"}>
                    A Standardized Test  Battery for the Study of Synesthesia
                </Typography>
                <Typography variant={"body1"}>
                    Published results derived from the online Synaesthesia Battery
                    <Button
                        target={"_blank"}
                        component={"a"}
                        href={"https://synesthete.ircn.jp/files/EaglemanetalSynesthesiaBattery2006.pdf"}
                        endIcon={<OpenInNewIcon />}
                        color={"info"}
                    >
                        Go to paper
                    </Button>
                </Typography>
                <br/>
                <Typography variant={"h6"}>
                    Validating a Standardised Test Battery for Synesthesia: Does the Synesthesia Battery Reliably Detect Synesthesia?
                </Typography>
                <Typography variant={"body1"}>
                    Published results derived from the online Synaesthesia Battery
                    <Button
                        target={"_blank"}
                        component={"a"}
                        href={"https://www.sciencedirect.com/science/article/pii/S1053810015000276?via%3Dihub"}
                        endIcon={<OpenInNewIcon />}
                        color={"info"}
                    >
                        Go to paper
                    </Button>
                </Typography>
                <br/>
                <Typography variant={"h6"}>
                    Book
                </Typography>
                <Typography variant={"body1"}>
                    Wednesday is Indigo Blue: Discovering the Brain of Synesthesia
                    <Button
                        target={"_blank"}
                        component={"a"}
                        href={"https://www.amazon.com/Wednesday-Indigo-Blue-Discovering-Synesthesia/dp/0262516705"}
                        endIcon={<OpenInNewIcon />}
                        color={"info"}
                    >
                        Amazon
                    </Button>
                </Typography>
                <br/>

            </Container>
        </React.Fragment>
    );
}
