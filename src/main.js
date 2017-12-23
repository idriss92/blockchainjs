const SHA256 = require("crypto-js/sha256");
const uuidv1 = require('uuid/V1');
const stringBuilder = require('stringbuilder');

export class Node{
    constructor(address){
        this.node = address;
    }
}

export class Response {
    constructor(message, index, transactions, proof, previousHash){
        this.message = message,
        this.index = index,
        this.transactions = transactions,
        this.proof = proof,
        this.previousHash = previousHash
    }
}

export class Transaction{
    constructor(amount, recipient, sender){
        this.amount = amount;
        this.recipient = recipient;
        this.sender = sender;
    }
}
export class Block {
  constructor(index, previousHash = '', transactions = null) {
    this.index = index;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.timestamp = Date.now();
    // this.data = data;
    this.hash = '';
    this.proof = 0;
  }

}


export class Blockchain{
    constructor() {
        this.chain =[];
        this.nodes = [];
        this.currentTransactions = [];
        this.difficulty = 5;
        this.createNewBlock(100, "1");
        this.nodeId = uuidv1();
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    createNewBlock(proof, previousHash = null){
        let block = new Block(this.chain.length, "", previousHash,"");
        if(previousHash === null){
            block.previousHash = this.getLatestBlock().hash;
        }
        else{
            block.previousHash = previousHash;
        }
        block.transactions = this.currentTransactions;
        this.currentTransactions = [];
        block.hash = this.calculateHash(block);
        this.chain.push(block);
        return block;
    }

    isChainValid() {        
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }

    resolveConflicts(){
        let newChain = [];
        this.nodes.forEach(
            node =>{
                
            }
        )
        if(newChain != null){
            this.chain = newChain;
            return true;
        }
        return false;
    }

    mine(){
        console.log('mining')
        let proof = this.createPow(this.getLatestBlock().proof, this.getLatestBlock().previousHash);
        this.createTransaction("0", this.nodeId, 1);
        let block = this.createNewBlock(proof);
        return JSON.stringify(new Response("New block forged", block.index, block.transactions, block.proof, block.previousHash));
    }

    createPow(lastProof, previousHash){
        let proof = 0;
        while(!this.isValidProof(lastProof,proof))
            proof++;
        return proof;
    }

    isValidProof(lastProof, proof, previousHash){
        let toGuess = `${lastProof}${proof}${previousHash}`;
        let result = SHA256(toGuess);
        
        return result.toString().startsWith(Array(this.difficulty +1).join("0"));
    }

    calculateHash(block){
        return SHA256(block).toString();
    }

    createTransaction(sender, recipient, amount){
        var transaction = new Transaction(amount,recipient,sender);
        this.currentTransactions.push(transaction);
    }

    registerNode(adress){
        this.nodes.push(new Node(adress));
    }
    registerNodes(nodes){
        let builder  = new stringBuilder();
        nodes.forEach(node=>{
            let url = `http://${node}`;
            this.registerNode(url);
            builder.append(url);
        });
        let result = builder.toString();
        return result.substring(0, result.length -2);
    }
}

// let savjeeCoin = new Blockchain();
// for(let i = 0; i < 2; i++){
// console.log(savjeeCoin.mine());
// }