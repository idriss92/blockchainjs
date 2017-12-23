const SHA256 = require('crypto-js/sha256');
const uuidv1 = require('uuid/V1');
const difficulty = 1;

class Response {
    constructor(message, index, transactions, proof, previousHash){
        this.message = message,
        this.index = index,
        this.transactions = transactions,
        this.proof = proof,
        this.previousHash = previousHash
    }
}
class Transaction{
    constructor(amount, recipient, sender){
        this.amount = amount;
        this.recipient = recipient;
        this.sender = sender;
    }
}

class Block{
    constructor(index, data, previousHash = '' , transactions, proof){
        this.index = index;
        this.timestamp = Date.now();
        // this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.proof = proof;
        this.transactions = transactions
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.proof).toString();
    }

}

class Node{
    constructor(address){
        this.node = address;
    }
}

class Blockchain{
    // chain = [];
    // // nodes = [];
    // currentTransactions = []
    constructor(){
        this.chain = [this.createGenesisBlock()];
        // difficulty = 2;
        this.currentTransactions = [];
        this.nodeId = uuidv1();
        // this.nodes = [];
        // this.chain = [];
        // this.addBlock(100, "1");
    }

    createGenesisBlock(){
        return new Block(0, "Genesis block", "0")
    }

    getLatestBlock(){
        return this.chain.slice(-1)[0];
    }

    addBlock(newBlock){
        //let block = new Block(this.chain.length,"data",previousHash, this.currentTransactions, proof) 
        if(previousHash == null){
            block.previousHash = this.getLatestBlock().previousHash;
        }
        else{
            block.previousHash = previousHash;
        }
        block.hash = block.calculateHash();
        this.currentTransactions = [];
        this.chain.push(block);
        return block;
    }

    isChainValid(){
        for(let i =1; i < this.chain.length; i++){
            const currentBlock = this.chain[1];
            const previousBlock = this.chain[i-1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
            return true
        }
    }

    registerNode(adress){
        this.nodes.add(new Node(adress));
    }

    createProofOfWork(newBlock){
        while(newBlock.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")){
            console.log('createproofofwork'+newBlock.proof)
            newBlock.proof++;
        }
        return newBlock.proof;
    }

    // validProof(lastProof, proof, previousHash){
    //     return previousHash.substring(0, difficulty) !== Array(difficulty+1).join("0");
    // }

    //server calls mine
    

    // server calls
    registerNodes(addresses){
        console.log('hello')
        addresses.forEach(adress => {
            let url = `http://${address}`;
            registerNode(url);
        });
        console.log(`${this.nodes.length} new nodes have been added`);
    }

    // server calls
    createTransaction(sender, recipient, amount){
        let transaction = new Transaction(amount, recipient, sender);
        this.currentTransactions.push(transaction);
        return transaction;
    }

    // server calls
    mine(){
        let proof = this.createProofOfWork(/*this.getLatestBlock().proof,*/ this.getLatestBlock().hash);
        this.createTransaction("0", this.nodeId, 1);
        let block = this.addBlock(proof);
        return new Response("New block forged", block. index, block. transactions, block.proof,block.previousHash);
    }
}

let savjeeCoin = new Blockchain();
for(let i = 0; i<1; i++){
console.log(savjeeCoin.mine());
}
// addBlock(proof, previousHash = null)

// console.log("mining block 1...");
// savjeeCoin.addBlock(new Block(1, { amount: 4 }, savjeeCoin.getLatestBlock().previousHash, "", 1));

// console.log("mining block 2...");
// savjeeCoin.addBlock(new Block(2, { amount: 8 }, savjeeCoin.getLatestBlock().previousHash, ""));

console.log(JSON.stringify(savjeeCoin,null,4));

