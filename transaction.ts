import {Hash} from "./hash";
import {BlockChain} from "./blockchain";

export class Transaction {
    public prevTransaction: Transaction;
    public hash: string;
    public static separator: string = '|';
    public static defaultHash: string = Hash.build('');

    public static fromString(string: string, blockChain: BlockChain): Transaction {
        var [hash, amount, from, to, date] = string.split(Transaction.separator);
        var lastTransaction = blockChain.lastTransaction;
        var transaction = new Transaction(parseFloat(amount), from, to, new Date(+date));
        transaction.hash = hash;
        transaction.prevTransaction = lastTransaction;
        if (!transaction.check()) {
            throw new Error('Transaction is incorrect');
        }
        return transaction;
    }

    constructor(public amount: number,
                public from: string,
                public to: string,
                public date: Date) {

    }

    public get isFirst() {
        return !(this.prevTransaction instanceof Transaction);
    }

    public toString(): string {
        return [
            this.hash,
            this.amount.toString(),
            this.from,
            this.to,
            this.date.valueOf()
        ].join(Transaction.separator)
    }

    private get prevHash() {
        return this.isFirst ? Transaction.defaultHash : this.prevTransaction.hash;
    }

    public buildHash() {
        // return (this.isFirst ? 0 : this.prevTransaction.amount) + '::' + this.amount;
        let prevHash = this.prevHash;
        let strings = [
            prevHash,
            this.amount.toString(),
            this.from,
            this.to,
            this.date.toISOString()
        ];
        return Hash.build(strings.join(Transaction.separator));
    }

    public check(): boolean {
        let builtHash = this.buildHash();
        return this.hash == builtHash;
    }
}
