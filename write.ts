import {BlockChain} from "./blockchain";

(async () => {
    var chain = new BlockChain();

    chain.add('satoshi', 'bill', 100)
        .add('satoshi', 'bill', 150)
        .add('bill', 'satoshi', 50)
        .add('bill', 'satoshi', 1000)
        .add('satoshi', 'bill', 800)
        .add('satoshi', 'bill', 1245)
        .add('bill', 'satoshi', 200)
        .add('bill', 'satoshi', 45)
        .add('bill', 'satoshi', 1000)
        .add('bill', 'satoshi', 100)
        .add('alice', 'satoshi', 500.5)
        .add('satoshi', 'alice', 400)
        .add('satoshi', 'alice', 50)
        .add('satoshi', 'alice', 49)
        .add('satoshi', 'alice', 1.5)
        .add('satoshi', 'bill', 90)
        .add('satoshi', 'bill', 9)
        .add('satoshi', 'bill', 1)
        .add('bob', 'alice', 12)
        .add('bob', 'satoshi', 12)
        .add('bob', 'bill', 12)
        .add('bob', 'bill', 12)
    ;

    await chain.save('block.txt');

})();
