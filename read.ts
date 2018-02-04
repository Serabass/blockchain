import {BlockChain} from "./blockchain";

(async () => {
    var chain = await BlockChain.fromFile('block.txt');
    var bill = chain.getBalance('bill');
    var satoshi = chain.getBalance('satoshi');
    var alice = chain.getBalance('alice');
    var bob = chain.getBalance('bob');

    console.log('Bill:', bill);
    console.log('Satoshi:', satoshi);
    console.log('Alice:', alice);
    console.log('Bob:', bob);

    console.log('Chain correctivity: ', chain.check());
})();
