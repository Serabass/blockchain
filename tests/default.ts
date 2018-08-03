import {expect} from "chai";
import "mocha";
import {BlockChain} from "../blockchain";
import {StringTransaction} from "../transactions/string-transaction";

describe("Hello function", () => {
    let blockChain: BlockChain<string>;
    beforeEach(() => {
        blockChain = new BlockChain();
    });

    it("Should create one transaction", () => {
        let stringTransaction = new StringTransaction(blockChain);
        stringTransaction.data = "hello!";
        stringTransaction.datetime = new Date();
        stringTransaction.hash = stringTransaction.buildHash();
        blockChain.addTransaction(stringTransaction);
        expect(blockChain.length).to.eq(1);
    });

    it("Should fail on change transaction data", () => {
        for (let i = 0; i < 10; i++) {
            let stringTransaction = new StringTransaction(blockChain);
            stringTransaction.data = Math.random().toString(16);
            stringTransaction.datetime = new Date();
            stringTransaction.hash = stringTransaction.buildHash();
            blockChain.addTransaction(stringTransaction);
        }

        expect(blockChain.check()).to.eq(true);

        let randomIndex = Math.round(Math.random() * blockChain.transactions.length - 1);

        blockChain.transactions[randomIndex].data = "Kill me";

        expect(blockChain.check()).to.eq(false);
    });

    it("Should fail on change transaction datetime", () => {
        for (let i = 0; i < 10; i++) {
            let stringTransaction = new StringTransaction(blockChain);
            stringTransaction.data = Math.random().toString(16);
            stringTransaction.datetime = new Date();
            stringTransaction.hash = stringTransaction.buildHash();
            blockChain.addTransaction(stringTransaction);
        }

        expect(blockChain.check()).to.eq(true);

        let randomIndex = Math.round(Math.random() * blockChain.transactions.length - 1);

        blockChain.transactions[randomIndex].datetime.setFullYear(0);

        expect(blockChain.check()).to.eq(false);
    });
});
