import {BlockChain} from "./blockchain";

(async () => {
    let chain = new BlockChain();
    let coin = () => Math.random() > 0.5;

    for (let i = 0; i < 10000; i++) {
        if (coin()) {
            chain.add("a");
        } else {
            chain.add("b");
        }
    }

    await chain.save("block.txt");
})();
