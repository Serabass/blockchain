import {BlockChain} from "./blockchain";

(async () => {
    let chain = await BlockChain.fromFile("block.txt");
    console.log("Chain correctivity: ", chain.check());
})();
