import {expect} from "chai";
import "mocha";
import {BlockChain} from "../blockchain";
import {StringTransaction} from "../transactions/string-transaction";

describe("Hello function", () => {
    let blockChain: BlockChain;
    beforeEach(() => {
        blockChain = new BlockChain();
    });

    it("Test 1", () => {
        let stringTransaction = new StringTransaction(blockChain);
        stringTransaction.data = "hello!";
        stringTransaction.datetime = new Date();
        stringTransaction.hash = stringTransaction.buildHash();
        blockChain.addTransaction(stringTransaction);
        expect(blockChain.length).to.eq(1);
    });

    it("Test 2", () => {
        for (let i = 0; i < 10; i++) {
            let stringTransaction = new StringTransaction(blockChain);
            stringTransaction.data = "hello!";
            stringTransaction.datetime = new Date();
            stringTransaction.hash = stringTransaction.buildHash();
            blockChain.addTransaction(stringTransaction);
        }

        expect(blockChain.check()).to.eq(true);

        blockChain.transactions[0].data = "Kill me";

        expect(blockChain.check()).to.eq(false);
    });
});
