import * as byline from "byline";
import {EventEmitter} from "events";
import * as fs from "fs";
import * as mfs from "mz/fs";
import * as stream from "stream";
import {StringTransaction} from "./transactions/string-transaction";

export class BlockChain extends EventEmitter {
    public static separator = "\n";

    public static async fromFile(path: string): Promise<BlockChain> {
        return BlockChain.fromStream(fs.createReadStream(path));
    }

    public static fromStream(readable: stream.Readable): Promise<BlockChain> {
        return new Promise<BlockChain>((resolve, reject) => {
            let blockChain = new BlockChain();
            let byLineStream = byline(readable);
            byLineStream
                .on("data", (line: Buffer) => {
                    let source = line.toString("utf-8");
                    let transaction = new StringTransaction(blockChain);
                    transaction.parseBlock(source);
                    blockChain.addTransaction(transaction);
                })
                .on("error", (error) => {
                    reject(error);
                })
                .on("end", () => {
                    resolve(blockChain);
                });
        });
    }

    private transactions: StringTransaction[] = [];

/*
    public readStream(readable: stream.Readable): IterableIterator<Transaction> {
        let byLineStream = byline(readable);
        byLineStream
            .on("data", (line: Buffer) => {
                let source = line.toString("utf-8");
                let transaction = new StringTransaction(this);
                transaction.parseBlock(source);
                this.addTransaction(transaction);
                this.emit("newTransaction", transaction);
            });
    }
*/

    public addTransaction(transaction: StringTransaction): BlockChain {
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

    public add(data: string, date: Date = new Date()): BlockChain {
        let transaction = new StringTransaction(this);
        transaction.data = data;
        transaction.date = date;
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
