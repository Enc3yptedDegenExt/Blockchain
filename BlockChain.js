const crypto =  require('crypto');
const secret = "CodeGuru";

class Block{
    constructor(id, timestamp, data, lastBlockHash){
    this.id = id;
    this.timestamp = timestamp;
    this.data = data;
    this.lastBlockHash = lastBlockHash;
    this.hash = this.createHash;
    }

    createHash(){
        return crypto.createHmac('sha256',secret)
        .update(this.id + this.timestamp + JSON.stringify(this.data) + this.lastBlockHash)
        .digest('hex')

    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, Date.now(), {}, "" )
    }

    getLastBlockHash(){
        return this.chain[this.chain.length - 1].hash;
    }

    addBlock(block){
        block.lastBlockHash = this.getLastBlockHash();
        block.hash = block.createHash();
        this.chain.push(block);


    }

}

let  BullInu = new BlockChain();
BullInu.addBlock(new Block(1, Date.now(),{ balance: 500}));

console.log(BullInu);