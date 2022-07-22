export const CURRENT_BALANCE = 100; // user has 100 ATOM to stake
export const APY =  5; // 5% interest rate on staked amount
export const NETWORK_FEE = 0.005075;

export const calculateProjectedBalance = (amount) => {
    return new Promise((resolve, reject) => {
        const balance = (amount - NETWORK_FEE) * (1 + (APY / 100));
        if (isNaN(balance)) reject('Invalid value');
        resolve(balance.toFixed(6));
    })
}

// testing again


export const calculateAmountToStake = (balance) => {
    return new Promise((resolve, reject) => {
        const amount = (balance / (1 + (APY / 100))) + NETWORK_FEE;
        if (isNaN(amount)) reject('Invalid value');
        resolve(amount.toFixed(6));
    })
}

export const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
        month: 'long', 
        day: '2-digit',
        year: 'numeric', 
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
}

export const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
