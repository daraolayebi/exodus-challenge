import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
    margin-bottom: 6em;
`;

const NavWrapper = styled.ul`
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
  font-size: .9em;
  text-align: center;
  padding: 1.5em;
  cursor: pointer;
  position: relative;
  transition: all 200ms ease-in-out;

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
            <Nav>
                <NavWrapper>
                    <Link>Overview</Link>
                    <Link className="active">Earn ATOM</Link>
                    <Link>Unstake</Link>
                    <Link>Claim Reward</Link>
                </NavWrapper>
            </Nav>
        </header>
    );
}

export default Navbar;