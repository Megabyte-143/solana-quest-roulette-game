const web3 = require("@solana/web3.js");

const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");

//console.log(connection);

//const userWallet = web3.Keypair.generate();
//console.log(userWallet);
let userPublicKey = [
    115, 148, 4, 159, 45, 116, 251, 63,
    149, 142, 8, 207, 118, 189, 212, 188,
    240, 28, 59, 189, 67, 2, 54, 123,
    203, 225, 204, 54, 162, 139, 82, 128
];
let userSecretKey = [
    108, 175, 171, 208, 141, 149, 21, 70, 85, 67, 116,
    45, 11, 95, 15, 18, 133, 128, 161, 151, 121, 47,
    75, 143, 112, 211, 184, 70, 123, 68, 255, 77, 115,
    148, 4, 159, 45, 116, 251, 63, 149, 142, 8, 207,
    118, 189, 212, 188, 240, 28, 59, 189, 67, 2, 54,
    123, 203, 225, 204, 54, 162, 139, 82, 128
];

const userWallet = web3.Keypair.fromSecretKey(new Uint8Array(userSecretKey));

const airDropSol = async () => {
    try {
        console.log(`-- Airdropping 2 SOL --`)
        const fromAirDropSignature = await connection.requestAirdrop(
            new web3.PublicKey(userWallet.publicKey), 2 * web3.LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (e) {
        console.log(e);
    }
}
const getWalletBalance = async () => {
    try {
        const walletBalance = await connection.getBalance(new web3.PublicKey(userWallet.publicKey));
        console.log(`Wallet balance: ${parseInt(walletBalance) / web3. LAMPORTS_PER_SOL}SOL`)
    } catch (err) {
        console.log(err);
    }
};

driverFunction = async ()=>{
    getWalletBalance();
    airDropSol();
    getWalletBalance();
}
driverFunction();