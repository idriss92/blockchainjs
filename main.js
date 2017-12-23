const SHA256 = require("crypto-js/sha256");
const uuidv1 = require('uuid/V1');

class Node{
    constructor(address){
        this.node = address;
    }
}

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
class Block {
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


class Blockchain{
    constructor() {
        this.chain =[];
        this.nodes = [];
        this.difficulty = 5;
        this.createNewBlock(100, "1");
        this.nodeId
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
        // create transaction
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
}

let savjeeCoin = new Blockchain();
console.log(savjeeCoin.mine());