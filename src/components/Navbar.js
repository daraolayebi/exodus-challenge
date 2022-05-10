import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;
    height: 100%;
    background-color: #091111;
`;

const Link = styled.li`
  font-size: 1em;
  text-align: center;
  padding: 1.5em;
  cursor: pointer;
  position: relative;
  transition: color 200ms ease-in-out;

    &.active,
    &:hover,
    &:focus {
        color: #fff;
        
        &:after {
            content: '';
            display: block;    
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: 40%;
            height: 100%;
            border-bottom: 2px solid #02C1FF;
        }
    }
`;

function Navbar() {
    return (
        <header>
            <nav>
                <Wrapper>
                    <Link>Overview</Link>
                    <Link className="active">Earn ATOM</Link>
                    <Link>Unstake</Link>
                    <Link>Claim Reward</Link>
                </Wrapper>
            </nav>
        </header>
    );
}

export default Navbar;