import React from 'react';
import styled from 'styled-components';
import CosmosLogo from './svg/CosmosLogo';

const HeadingWrapper = styled.h1`
    text-align: center;
    margin-top: 3em;
`;

const PageTitle = styled.h1`
    font-size: 2.5em;
    color: #fff;
    padding-top: 30px;
`;

const PageDesc = styled.p`
  padding-top: 10px;
`;

function Heading() {
    return (
        <HeadingWrapper>
            <CosmosLogo />
            <PageTitle>Earn Cosmos ATOM</PageTitle>
            <PageDesc>
                Staking allows you to earn ATOM like a savings account.
                <br />
                Earning are calculated based on your staking amount.
            </PageDesc>
        </HeadingWrapper>
    );
}

export default Heading;