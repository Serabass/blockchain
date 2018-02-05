import {Transaction} from "../transaction";

export class NumberTransaction extends Transaction<number> {
    public serialize(data: number): string {
        return data
            .toString()
            .split("")
            .reverse()
            .join("")
            ;
    }

    public deserialize(input: string): number {
        let value = input
            .split("")
            .reverse()
            .join("")
        ;
        return parseFloat(value);
    }

    public serializeDate(): string {
        return this.date
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
        this.date = new Date(value);
    }
}
