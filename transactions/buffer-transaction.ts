

import {Transaction} from "../transaction";

export class BufferTransaction extends Transaction<Buffer> {
    public serialize(data: number): string {
        return data.toString().split('').reverse().join('');
    }

    public deserialize(input: string): number {
        return parseFloat(input.split('').reverse().join(''));
    }

    public serializeDate(): string {
        return this.date.toDateString().split('').reverse().join('');
    }

    public deserializeDate(date: string): void {
        this.date = new Date(date.split('').reverse().join(''));
    }
}
