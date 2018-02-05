import {Transaction} from "../transaction";

export class StringTransaction extends Transaction<string> {
    public get separator() {
        return "|";
    }

    public serialize(data: string): string {
        return data.split("").reverse().join("");
    }

    public deserialize(input: string): string {
        return input.split("").reverse().join("");
    }
}
