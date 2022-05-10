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
    });
}

// 1,000 × (1 + 12%) = $1,120