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
        stringTransaction.date = new Date();
        stringTransaction.hash = stringTransaction.buildHash();
        blockChain.addTransaction(stringTransaction);
        expect(blockChain.length).to.eq(1);
    });
});
