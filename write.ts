import {BlockChain} from "./blockchain";

(async () => {
    var chain = new BlockChain();
    // satoshi = 0, bill = 0

    chain.add('satoshi', 'bill', 100)
        .add('satoshi', 'bill', 150)
        .add('bill', 'satoshi', 50)
        .add('bill', 'satoshi', 1000)
        .add('satoshi', 'bill', 800);

    await chain.save('block.txt');

})();
