const web3 = require("@solana/web3.js");
const prompt = require("prompt-sync")({ sigint: true });

const {
    getWalletBalance,
    transferSOL,
    airDropSol
} = require("./solana");
const {
    randomNumber,
    totalAmtToBePaid,
    getReturnAmount
} = require("./helper");

// const wallet = web3.Keypair.generate();
// console.log(wallet);

// USER WALLET DETAILS
let userPublicKey = [
    113, 163, 59, 31, 191, 97, 137, 189,
    139, 168, 15, 177, 2, 218, 152, 52,
    107, 236, 62, 121, 163, 93, 127, 244,
    218, 16, 179, 116, 93, 130, 80, 107
];
let userSecretKey = [
    215, 31, 34, 43, 64, 236, 130, 101, 187, 0, 66,
    73, 223, 182, 144, 5, 186, 224, 143, 52, 2, 25,
    4, 200, 244, 63, 184, 164, 174, 9, 77, 136, 113,
    163, 59, 31, 191, 97, 137, 189, 139, 168, 15, 177,
    2, 218, 152, 52, 107, 236, 62, 121, 163, 93, 127,
    244, 218, 16, 179, 116, 93, 130, 80, 107
];
const userWallet = web3.Keypair.fromSecretKey(new Uint8Array(userSecretKey));

//Transfer Wallet details
let transferPublicKey = [
    138, 164, 143, 110, 85, 109, 232, 232,
    22, 158, 3, 214, 144, 54, 145, 0,
    190, 115, 180, 96, 242, 235, 99, 137,
    113, 186, 24, 110, 200, 191, 129, 81
];

let transferSecretKey = [
    227, 9, 20, 190, 46, 232, 137, 228, 131, 172, 37,
    110, 143, 53, 123, 239, 226, 151, 92, 77, 101, 41,
    122, 53, 98, 69, 245, 8, 167, 151, 32, 28, 138,
    164, 143, 110, 85, 109, 232, 232, 22, 158, 3, 214,
    144, 54, 145, 0, 190, 115, 180, 96, 242, 235, 99,
    137, 113, 186, 24, 110, 200, 191, 129, 81
];

const transferWallet = web3.Keypair.fromSecretKey(new Uint8Array(transferSecretKey));


const gameExecution = async () => {
    console.log("The maximum bidding amount is 2.5 SOL here.");

    const stakeAmt = prompt("What is the amount of SOL you want to stake? ");

    const ratio = prompt("What is the ratio of your staking? ");

    const paymentAmt = totalAmtToBePaid(stakeAmt, (parseFloat(ratio.split(":")[0])));

    const returnAmt = getReturnAmount(stakeAmt, (parseFloat(ratio.split(":")[1])));

    const no = prompt("Guess a random number from 1 to 5 (both included) ");

    const paymentSign = await transferSOL({
        from: userWallet,
        to: transferWallet,
        transferAmount: paymentAmt
    });

    console.log(`Signature of payment for playing the game ${paymentSign}`);

    if (randomNumber(1, 5) == no) {

        console.log("Your guess is absoluetly correct.");

        const returnSign = await transferSOL({
            from: transferWallet,
            to: userWallet,
            transferAmount: returnAmt
        });

        console.log(`Here is the price signature ${returnSign}`);
    }
    else {
        console.log("Better Luck next time.");
    }
}

gameExecution();

//Help Function

helpFunction = async () => {
    await getWalletBalance(userWallet.publicKey);
    await airDropSol(userWallet.publicKey);
    await getWalletBalance(userWallet.publicKey);

}
// helpFunction();