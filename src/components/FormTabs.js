import React from 'react';
import styled from 'styled-components';

const Tabs = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 3em;
    background-color: #0A0B11;
    border-radius: 100px;
`;

const Tab = styled.button`
    padding: 20px;
    border: none;
    width: 100%;
    border-radius: 100px;
    background: transparent;
    color: ${({theme}) => theme.colors.grey};

    &.active {
        background-color: #fff;
        color: #0A0B11;
    }
`;
function FormTabs(props) {

    const handleTabClick = (e) => {
        e.preventDefault();
        const tabs = e.target.parentElement.children;
        Array.from(tabs).forEach(tab => tab.classList.remove("active"));
        
        e.target.classList.add("active");
        props.onTabChange(e.target.dataset.value);
    }
    
    return (
        <Tabs onClick={(e) => handleTabClick(e)}>
            <Tab aria-label="25% of balance" data-value="25">25%</Tab>
            <Tab aria-label="50% of balance" data-value="50">50%</Tab>
            <Tab aria-label="100% of balance" data-value="100">ALL</Tab>
        </Tabs>
    );
}

export default FormTabs;