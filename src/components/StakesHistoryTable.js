import React from "react";
import styled from "styled-components";

const ListWrapper = styled.ul`
    margin: 3.5em 0;
`;

const ListItem = styled.li`
    background-color: #25282A;
    border-radius: 3px;
    padding: 1.5em 2em;
    display: flex;
    justify-content: space-between;

    &:not(:last-child) {
        margin-bottom: 1em;
    }
`;

const Timestamp = styled.span`
    color: #fff;
`;

const Amount = styled.span`
    color: ${({theme}) => theme.colors.purple};
    font-weight: 400;
`;

function TransactionsTable(props) {
    return (
        <ListWrapper>
            {
                props?.transactions?.map(transaction => {
                    return (
                        <ListItem key={transaction.id}>
                            <Timestamp>{transaction.timestamp}</Timestamp>
                            <Amount>{transaction.amount} ATOM</Amount>
                        </ListItem>
                    );
                })
            }
        </ListWrapper>
    );
}

export default TransactionsTable;