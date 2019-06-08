import {EventEmitter} from "events";
import * as mfs from "mz/fs";
import {Transaction} from "./transaction";

export abstract class BlockChain<T> extends EventEmitter {
    public static separator = "\n";

    public transactions: Transaction<T>[] = [];

    public abstract newTransaction(): Transaction<T>;

    public addTransaction(transaction: Transaction<T>): BlockChain<T> {
        if (this.transactions.length >= 1) {
            transaction.prevTransaction = this.lastTransaction;
            transaction.hash = transaction.buildHash();
        } else {
            transaction.hash = transaction.buildHash();
        }
        this.transactions.push(transaction);
        return this;
    }

    public get lastTransaction() {
        return this.transactions[this.transactions.length - 1];
    }

    public get length() {
        return this.transactions.length;
    }

    public add(data: string, date: Date = new Date()): BlockChain<T> {
        let transaction = this.newTransaction();
        transaction.data = data as unknown as T;
        transaction.datetime = date;
        transaction.hash = transaction.buildHash();
        transaction.prevTransaction = this.lastTransaction;
        this.addTransaction(transaction);
        return this;
    }

    public print() {
        for (let transaction of this.transactions) {
            console.log(transaction.data, transaction.hash);
            console.log(transaction.toString());
            console.log("check:", transaction.check());
        }
    }

    public check() {
        return this.transactions.every((transaction) => transaction.check());
    }

    public toString() {
        return this.transactions
            .map((t) => t.toString())
            .join(BlockChain.separator);
    }

    public async save(path: string) {
        let value = this.toString();
        return mfs.writeFile(path, value);
    }

    public * enumTransactions() {
        for (let transaction of this.transactions) {
            yield transaction;
        }
    }
}
