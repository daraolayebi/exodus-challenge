import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;
    height: 100%;
    background-color: #091111;
`;

const Link = styled.li`
  font-size: 1.5em;
  text-align: center;
  color: #535454;
  padding: 1.5em;

    &.active {
        color: #fff;
        
        &:after {
            content: '';
            display: block;
            border-bottom: 3px solid #02C1FF;
        }
    }
`;

function Navbar() {
    return (
    <Wrapper>
        <Link>Overview</Link>
        <Link className="active">Earn ATOM</Link>
        <Link>Unstake</Link>
        <Link>Claim Reward</Link>
    </Wrapper>
    );
}

export default Navbar;