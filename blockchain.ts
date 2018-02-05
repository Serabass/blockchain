import {Transaction} from "./transaction";
import * as fs from "fs";
import * as mfs from "mz/fs";
import * as stream from "stream";
import * as byline from "byline";

export class BlockChain {
    public transactions: Transaction[] = [];
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
                    blockChain.addTransaction(Transaction.fromString(source, blockChain));
                })
                .on('error', (error) => {
                    reject(error);
                })
                .on('end', () => {
                    resolve(blockChain);
                });
        });
    }

    public static from(source: string): BlockChain {
        var blockChain: BlockChain = new BlockChain();
        var lines = source.split(BlockChain.separator);

        for (let line of lines) {
            blockChain.addTransaction(Transaction.fromString(line, blockChain));
        }

        return blockChain;
    }

    public addTransaction(transaction: Transaction): BlockChain {
        if (this.transactions.length >= 1) {
            transaction.prevTransaction = this.lastTransaction;
            transaction.hash = transaction.buildHash();
        } else {
            transaction.hash = transaction.buildHash();
        }
        this.transactions.push(transaction);
        return this;
    }

    public getBalance(userName: string) {
        var v1 = this.transactions
            .filter(transaction => transaction.from === userName)
            .map(transaction => transaction.amount);
        var v2 = this.transactions
            .filter(transaction => transaction.to === userName)
            .map(transaction => -transaction.amount);

        var b1 = v1.reduce((t1: number, t2: number) => t1 + t2, 0);
        var b2 = v2.reduce((t1: number, t2: number) => t1 + t2, 0);

        return b1 + b2;
    }

    public get lastTransaction() {
        return this.transactions[this.transactions.length - 1];
    }

    public add(from: string, to: string, amount: number, date: Date = new Date()): BlockChain {
        let transaction = new Transaction(amount, from, to, date);
        transaction.prevTransaction = this.lastTransaction;
        this.addTransaction(transaction);
        return this;
    }

    public print() {
        for (let transaction of this.transactions) {
            console.log(transaction.amount, transaction.hash);
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
}
