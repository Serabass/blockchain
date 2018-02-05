import {BlockChain} from "./blockchain";

(async () => {
    var chain = new BlockChain();

    function coin():boolean {
        return Math.random() > 0.5;
    }

    for (var i = 0; i < 10000; i++) {
        if (coin()) {
            chain.add((100 * Math.random()).toString());
        } else {
            chain.add((100 * Math.random()).toString());
        }
    }

    await chain.save('block.txt');

})();
