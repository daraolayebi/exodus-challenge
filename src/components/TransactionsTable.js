import React from "react";

function TransactionsTable(props) {
    return (
        <ul>
            {
                props?.stakes?.map(stake => {
                    return (
                        <li key={stake.id}>
                            <span>{stake.timestamp}</span>
                            <span>{stake.amount} ATOM</span>
                        </li>
                    );
                })
            }
        </ul>
    );
}

export default TransactionsTable;