import * as byline from "byline";
import * as stream from "stream";
import {BlockChain} from './blockchain';
import {StringTransaction} from "./transactions/string-transaction";
import * as fs from "fs";

export class StringBlockChain extends BlockChain<string> {
    public static fromStream<T>(readable: stream.Readable): Promise<StringBlockChain> {
        return new Promise<StringBlockChain>((resolve, reject) => {
            let blockChain = new StringBlockChain();
            byline(readable)
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

    public static async fromFile(path: string): Promise<BlockChain<any>> {
        return this.fromStream(fs.createReadStream(path));
    }

    newTransaction(): StringTransaction {
        return new StringTransaction(this);
    }
}
