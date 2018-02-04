import {BlockChain} from "./blockchain";

(async () => {
    var chain = await BlockChain.fromFile('block.txt');
    console.log('Chain correctivity: ', chain.check());
})();
