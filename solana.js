const web3 = require("@solana/web3.js");

//Balance 
const getWalletBalance = async (pubk) => {
    try {
        const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");
        const walletBalance = await connection.getBalance(new web3.PublicKey(pubk));
        console.log(`Wallet balance: ${parseInt(walletBalance) / web3.LAMPORTS_PER_SOL}SOL`)
    } catch (err) {
        console.log(err);
    }
};


//AIRDROP SOL
const airDropSol = async (pubk) => {
    try {
        const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");
        console.log(`-- Airdropping 2 SOL --`)
        const fromAirDropSignature = await connection.requestAirdrop(
            new web3.PublicKey(pubk), 2 * web3.LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (e) {
        console.log(e);
    }
}

//TRANSFER SOL
const transferSOL = async ({ from, to, transferAmount }) => {
    try {
        const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");

        const transaction = new web3.Transaction().add(
            web3.SystemProgram.transfer({
                fromPubkey: new web3.PublicKey(from.publicKey.toString()),
                toPubkey: new web3.PublicKey(to.publicKey.toString()),
                lamports: transferAmount * web3.LAMPORTS_PER_SOL
            })
        );

        const signature = await web3.sendAndConfirmTransaction(connection, transaction, [from]);
        return signature;
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getWalletBalance,
    airDropSol,
    transferSOL
};