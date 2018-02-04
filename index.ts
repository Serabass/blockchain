import {BlockChain} from "./blockchain";

(async () => {
    var x = new BlockChain();
    // satoshi = 0, bill = 0

    x.add('satoshi', 'bill', 100);
    // satoshi = -100, bill = 100

    x.add('satoshi', 'bill', 150);
    // satoshi = -250, bill = 250

    x.add('bill', 'satoshi', 50);
    // satoshi = 200, bill = -200

    var b = x.getBalance('bill');
    var s = x.getBalance('satoshi');
    debugger;

    await x.save('block.txt');

    var chain = await BlockChain.fromFile('block.txt');
    console.log('Chain correctivity: ', chain.check());
})();
