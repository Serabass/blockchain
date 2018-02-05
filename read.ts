import {BlockChain} from "./blockchain";

(async () => {
    let chain = await BlockChain.fromFile("block.txt");
    console.log("Chain is correct: ", chain.check());
})();
