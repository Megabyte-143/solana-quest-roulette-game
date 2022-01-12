const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getReturnAmount = (stakeAmt, ratio) => {
    
    console.log(`You will get ${stakeAmt*ratio} if guessing the number correctly.`);
    return (stakeAmt*ratio);
};

const totalAmtToBePaid = (stakeAmt,ratio) => { 
   
    console.log(`You need to pay ${stakeAmt*ratio} to move forward.`);
    return (stakeAmt*ratio);
};

module.exports = {
    randomNumber,
    getReturnAmount,
    totalAmtToBePaid
}