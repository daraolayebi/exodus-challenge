import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Heading from "./components/Heading";
import Navbar from "./components/Navbar";
import StakingForm from "./components/StakingForm";

const theme = {
    colors: {
        // primary: "#02C1FF",
        grey: "#5A5F63",
        purple: "#6A6B9C",
        white: "#fff",
    },
    spacing: {
        paddingSm: "1em",
        paddingMd: "2em",
        paddingLg: "3em",
    },
    fontSizes: {
        sm: "0.8em",
        md: "1em",
        lg: "1.2em",
        xl: "1.5em",
        xxl: "1.8em",
        xxxl: "2.2em",
    },
}

const Container = styled.div`
    max-width: 960px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
`;

function App() {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Navbar />
                <main>
                    <Container>
                        <Heading />
                        <StakingForm />
                    </Container>
                </main>
            </ThemeProvider>
        </div>
    );
}

export default App;
