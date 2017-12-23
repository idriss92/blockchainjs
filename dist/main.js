'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SHA256 = require("crypto-js/sha256");
var uuidv1 = require('uuid/V1');
var stringBuilder = require('stringbuilder');

var Node = exports.Node = function Node(address) {
    _classCallCheck(this, Node);

    this.node = address;
};

var Response = exports.Response = function Response(message, index, transactions, proof, previousHash) {
    _classCallCheck(this, Response);

    this.message = message, this.index = index, this.transactions = transactions, this.proof = proof, this.previousHash = previousHash;
};

var Transaction = exports.Transaction = function Transaction(amount, recipient, sender) {
    _classCallCheck(this, Transaction);

    this.amount = amount;
    this.recipient = recipient;
    this.sender = sender;
};

var Block = exports.Block = function Block(index) {
    var previousHash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var transactions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, Block);

    this.index = index;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.timestamp = Date.now();
    // this.data = data;
    this.hash = '';
    this.proof = 0;
};

var Blockchain = exports.Blockchain = function () {
    function Blockchain() {
        _classCallCheck(this, Blockchain);

        this.chain = [];
        this.nodes = [];
        this.currentTransactions = [];
        this.difficulty = 5;
        this.createNewBlock(100, "1");
        this.nodeId = uuidv1();
    }

    _createClass(Blockchain, [{
        key: 'getLatestBlock',
        value: function getLatestBlock() {
            return this.chain[this.chain.length - 1];
        }
    }, {
        key: 'createNewBlock',
        value: function createNewBlock(proof) {
            var previousHash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var block = new Block(this.chain.length, "", previousHash, "");
            if (previousHash === null) {
                block.previousHash = this.getLatestBlock().hash;
            } else {
                block.previousHash = previousHash;
            }
            block.transactions = this.currentTransactions;
            this.currentTransactions = [];
            block.hash = this.calculateHash(block);
            this.chain.push(block);
            return block;
        }
    }, {
        key: 'isChainValid',
        value: function isChainValid() {
            for (var i = 1; i < this.chain.length; i++) {
                var currentBlock = this.chain[i];
                var previousBlock = this.chain[i - 1];

                if (currentBlock.hash !== currentBlock.calculateHash()) {
                    return false;
                }

                if (currentBlock.previousHash !== previousBlock.hash) {
                    return false;
                }
            }

            return true;
        }
    }, {
        key: 'resolveConflicts',
        value: function resolveConflicts() {
            var newChain = [];
            this.nodes.forEach(function (node) {});
            if (newChain != null) {
                this.chain = newChain;
                return true;
            }
            return false;
        }
    }, {
        key: 'mine',
        value: function mine() {
            console.log('mining');
            var proof = this.createPow(this.getLatestBlock().proof, this.getLatestBlock().previousHash);
            this.createTransaction("0", this.nodeId, 1);
            var block = this.createNewBlock(proof);
            return JSON.stringify(new Response("New block forged", block.index, block.transactions, block.proof, block.previousHash));
        }
    }, {
        key: 'createPow',
        value: function createPow(lastProof, previousHash) {
            var proof = 0;
            while (!this.isValidProof(lastProof, proof)) {
                proof++;
            }return proof;
        }
    }, {
        key: 'isValidProof',
        value: function isValidProof(lastProof, proof, previousHash) {
            var toGuess = '' + lastProof + proof + previousHash;
            var result = SHA256(toGuess);

            return result.toString().startsWith(Array(this.difficulty + 1).join("0"));
        }
    }, {
        key: 'calculateHash',
        value: function calculateHash(block) {
            return SHA256(block).toString();
        }
    }, {
        key: 'createTransaction',
        value: function createTransaction(sender, recipient, amount) {
            var transaction = new Transaction(amount, recipient, sender);
            this.currentTransactions.push(transaction);
        }
    }, {
        key: 'registerNode',
        value: function registerNode(adress) {
            this.nodes.push(new Node(adress));
        }
    }, {
        key: 'registerNodes',
        value: function registerNodes(nodes) {
            var _this = this;

            var builder = new stringBuilder();
            nodes.forEach(function (node) {
                var url = 'http://' + node;
                _this.registerNode(url);
                builder.append(url);
            });
            var result = builder.toString();
            return result.substring(0, result.length - 2);
        }
    }]);

    return Blockchain;
}();

// let savjeeCoin = new Blockchain();
// for(let i = 0; i < 2; i++){
// console.log(savjeeCoin.mine());
// }