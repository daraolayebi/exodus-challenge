import React from "react";
import Tour from 'reactour'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import styled, { ThemeProvider } from "styled-components";
import Heading from "./components/Heading";
import Navbar from "./components/Navbar";
import StakeForm from "./components/StakeForm";
import StakesHistoryTable from "./components/StakesHistoryTable";

import { steps } from "./utils/tutorial";

const theme = {
    colors: {
        grey: "#5A5F63",
        purple: "#6A6B9C",
        red: "#f65454",
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
    const disableBody = (target) => {
        disableBodyScroll(target);
        localStorage.setItem('tutorialShown', true);
    };

    const enableBody = (target) => enableBodyScroll(target);

    const closeTour = () => {
        localStorage.setItem('tutorialShown', true);
    }

    return (
        <div>
            <Tour
                steps={steps}
                isOpen={localStorage.getItem('tutorialShown') ? false : true}
                onRequestClose={closeTour} 
                showNavigation={false}
                showNumber={false}
                stepInteraction={true}
                onAfterOpen={disableBody}
                onBeforeClose={enableBody}
                rounded={5}
                maskClassName="mask"
                closeButtonAriaLabel="Close guided tour"
            />
            <ThemeProvider theme={theme}>
                <Navbar />
                <main>
                    <Container>
                        <Heading />
                        <StakeForm />
                        <StakesHistoryTable />
                    </Container>
                </main>
            </ThemeProvider>
        </div>
    );
}

export default App;
