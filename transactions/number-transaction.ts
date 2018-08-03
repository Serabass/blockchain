import {Transaction} from "../transaction";

export class NumberTransaction extends Transaction<number> {
    public serializeBlock(data: number): string {
        return data
            .toString()
            .split("")
            .reverse()
            .join("")
            ;
    }

    public deserializeBlock(input: string): number {
        let value = input
            .split("")
            .reverse()
            .join("")
        ;
        return parseFloat(value);
    }

    public serializeDate(): string {
        return this.datetime
            .toDateString()
            .split("")
            .reverse()
            .join("")
            ;
    }

    public deserializeDate(date: string): void {
        let value = date
            .split("")
            .reverse()
            .join("")
        ;
        this.datetime = new Date(value);
    }
}
