import {BlockChain} from "./blockchain";
import {Hash} from "./hash";
import {StorageType} from "./storage-type";
import {nonenumerable} from './decorators/nonenumerable';

export class Transaction<T> {
    public static defaultHash: string = Hash.build("");

    @nonenumerable
    public prevTransaction: Transaction<T>;

    @nonenumerable
    public nextTransaction: Transaction<T>;
    public hash: string;
    public data: T;
    public datetime: Date;

    @nonenumerable
    public blockChain: BlockChain<T>;

    constructor(blockChain: BlockChain<T>) {
        this.blockChain = blockChain;
    }

    public get separator() {
        return "|";
    }

    public serializeBlock(data: T): StorageType | void {
    };

    public deserializeBlock(input: StorageType): T | void {
    };

    public serializeDate(): string {
        return (+this.datetime.valueOf()).toString();
    }

    public deserializeDate(date: string): void {
        this.datetime = new Date(+date);
    }

    public parseBlock(block: StorageType) {
        let [hash, data, date] = block.split(this.separator);
        this.hash = hash;
        this.data = this.deserializeBlock(data) as T;
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
