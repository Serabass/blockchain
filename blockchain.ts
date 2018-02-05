import * as fs from "fs";
import * as mfs from "mz/fs";
import * as stream from "stream";
import * as byline from "byline";
import {StringTransaction} from "./transactions/string-transaction";

export class BlockChain {
    public transactions: StringTransaction[] = [];
    public static separator = '\n';

    public static async fromFile(path: string): Promise<BlockChain> {
        return BlockChain.fromStream(fs.createReadStream(path));
    }

    public static fromStream(stream: stream.Readable): Promise<BlockChain> {
        return new Promise<BlockChain>((resolve, reject) => {
            var blockChain = new BlockChain();
            var byLineStream = byline(stream);
            byLineStream
                .on('data', (line: Buffer) => {
                    var source = line.toString('utf-8');
                    var transaction = new StringTransaction(blockChain);
                    transaction.parseBlock(source);
                    blockChain.addTransaction(transaction);
                })
                .on('error', (error) => {
                    reject(error);
                })
                .on('end', () => {
                    resolve(blockChain);
                });
        });
    }

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
            console.log('check:', transaction.check());
        }
    }

    public check() {
        return this.transactions.every((transaction) => transaction.check());
    }

    public toString() {
        return this.transactions
            .map(t => t.toString())
            .join(BlockChain.separator);
    }

    public async save(path: string) {
        var string = this.toString();
        return mfs.writeFile(path, string);
    }

    public * enumTransactions() {
        for (var transaction of this.transactions) {
            yield transaction;
        }
    }
}
