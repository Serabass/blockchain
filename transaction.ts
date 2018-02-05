import {BlockChain} from "./blockchain";
import {Hash} from "./hash";

export abstract class Transaction<T> {
    public static defaultHash: string = Hash.build("");

    public prevTransaction: Transaction<T>;
    public nextTransaction: Transaction<T>;
    public hash: string;
    public data: T;
    public date: Date;

    constructor(public blockChain: BlockChain) {

    }

    public get separator() {
        return "|";
    }

    public abstract serialize(data: T): string;

    public abstract deserialize(input: string): T;

    public serializeDate(): string {
        return this.date.valueOf().toString();
    }

    public deserializeDate(date: string): void {
        this.date = new Date(+date);
    }

    public parseBlock(block: string) {
        let [hash, data, date] = block.split(this.separator);
        this.hash = hash;
        this.data = this.deserialize(data);
        this.deserializeDate(date);

        let lastTransaction = this.blockChain.lastTransaction;
        if (lastTransaction) {
            this.prevTransaction = lastTransaction as any;
            lastTransaction.nextTransaction = this as any;
        }
        if (!this.check()) {
            throw new Error("Transaction is incorrect");
        }
    }

    public get isFirst() {
        return !(this.prevTransaction instanceof Transaction);
    }

    public toString(): string {
        return [
            this.hash,
            this.serialize(this.data),
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
            this.date.valueOf().toString(),
        ];
        return Hash.build(strings.join(this.separator));
    }

    public check(): boolean {
        let builtHash = this.buildHash();
        return this.hash === builtHash;
    }
}
