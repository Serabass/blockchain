
import {SerializedTransaction, Transaction} from "../transaction";

export class BufferTransaction extends Transaction<Buffer> {
    public get separator() {
        return '|';
    }

    public serialize(data: Buffer): string {
        throw new Error("Method not implemented.");
    }

    public deserialize(data: string): Buffer {
        throw new Error("Method not implemented.");
    }

}
