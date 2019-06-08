import {Transaction} from "../transaction";

export class BufferTransaction extends Transaction<Buffer> {
    public serializeBlock(data: Buffer): string {
        return data.toString().split("").reverse().join("");
    }

    public deserializeBlock(input: string): Buffer {
        return null;
    }

    public serializeDate(): string {
        return this.datetime.toDateString().split("").reverse().join("");
    }

    public deserializeDate(date: string): void {
        this.datetime = new Date(date.split("").reverse().join(""));
    }
}
