import {Transaction} from "../transaction";

export class StringTransaction extends Transaction<string> {
    public get separator() {
        return "|";
    }

    public serializeBlock(data: string): string {
        return data.split("").reverse().join("");
    }

    public deserializeBlock(input: string): string {
        return input.split("").reverse().join("");
    }
}
