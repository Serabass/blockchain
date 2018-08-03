import {BlockChain} from "./blockchain";
import {Hash} from "./hash";
import {StorageType} from "./storage-type";

export abstract class Transaction<T> {
    public static defaultHash: string = Hash.build("");

    public prevTransaction: Transaction<T>;
    public nextTransaction: Transaction<T>;
    public hash: string;
    public data: T;
    public datetime: Date;

    constructor(public blockChain: BlockChain<T>) {

    }

    public get separator() {
        return "|";
    }

    public abstract serializeBlock(data: T): StorageType;

    public abstract deserializeBlock(input: StorageType): T;

    public serializeDate(): string {
        return (+this.datetime.valueOf()).toString();
    }

    public deserializeDate(date: string): void {
        this.datetime = new Date(+date);
    }

    public parseBlock(block: StorageType) {
        let [hash, data, date] = block.split(this.separator);
        this.hash = hash;
        this.data = this.deserializeBlock(data);
        this.deserializeDate(date);

        let lastTransaction = this.blockChain.lastTransaction;
        if (lastTransaction) {
            this.prevTransaction = lastTransaction as any;
            lastTransaction.nextTransaction = this as any;
        }
        if (!this.check()) {
            throw new Error("Transaction is incorrect: " + block);
        }
    }

    public get isFirst() {
        return !(this.prevTransaction && this.prevTransaction instanceof Transaction);
    }

    public toString(): string {
        return [
            this.hash,
            this.serializeBlock(this.data),
            this.serializeDate(),
        ].join(this.separator);
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
            this.serializeDate(),
        ];
        return Hash.build(strings.join(""));
    }

    public check(): boolean {
        let builtHash = this.buildHash();
        return this.hash === builtHash;
    }
}
