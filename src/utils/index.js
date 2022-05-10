export const CURRENT_BALANCE = 100;
export const INTEREST_RATE =  5;

export const calculateAPY = (amount) => {
    return new Promise((resolve, reject) => {
        console.log({amount});
        const annualPercentageYield = amount * (1 + (INTEREST_RATE / 100));
        console.log(annualPercentageYield);
        resolve(annualPercentageYield);
        // const projectedBalance = (amount / USER_BALANCE) * 100;
        // resolve(projectedBalance);
        // 1,000 × (1 + 12%) = $1,120
    });
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
        hour12: false
    });
}

export const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
