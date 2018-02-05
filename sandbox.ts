import {BlockChain} from "./blockchain";

(async () => {
    var chain = await BlockChain.fromFile('block.txt');
    var trans = chain.enumTransactions();
    for (var current of trans) {
        console.log(current.data);
    }
})();
