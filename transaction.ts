import {Hash} from "./hash";
import {BlockChain} from "./blockchain";

export type SerializedTransaction<T> = {
    hash: string,
    data: T,
    date: Date
}

export abstract class Transaction<T> {
    public prevTransaction: Transaction<T>;
    public nextTransaction: Transaction<T>;
    public hash: string;
    public data: T;
    public date: Date;
    public static defaultHash: string = Hash.build('');

    public get separator() {
        return '|';
    };

    public abstract serialize(data: T): string;

    public abstract deserialize(input: string): T;

    constructor(public blockChain: BlockChain) {

    }

    public parseBlock(block: string) {
        var [hash, data, date] = block.split(this.separator);
        this.hash = hash;
        this.data = this.deserialize(data);
        this.date = new Date(+date);

        var lastTransaction = this.blockChain.lastTransaction;
        if (lastTransaction) {
            this.prevTransaction = <any>lastTransaction;
            lastTransaction.nextTransaction = <any>this;
        }
        if (!this.check()) {
            throw new Error('Transaction is incorrect');
        }
    }

    public get isFirst() {
        return !(this.prevTransaction instanceof Transaction);
    }

    public toString(): string {
        return [this.hash, this.serialize(this.data), this.date.valueOf().toString()].join(this.separator);
        // OR return this.prepareData(<SerializedTransaction<T>>this);
    }

    private get prevHash() {
        return this.isFirst ? Transaction.defaultHash : this.prevTransaction.hash;
    }

    public buildHash() {
        // return (this.isFirst ? 0 : this.prevTransaction.amount) + '::' + this.amount;
        let prevHash: string = this.prevHash;
        let strings = [
            prevHash,
            this.data,
            this.date.valueOf().toString()
        ];
        return Hash.build(strings.join(this.separator));
    }

    public check(): boolean {
        let builtHash = this.buildHash();
        return this.hash == builtHash;
    }
}
