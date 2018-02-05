import {Transaction} from "../transaction";

export class NumberTransaction extends Transaction<number> {
    serialize(data: number): string {
        return data.toString().split('').reverse().join('');
    }

    deserialize(input: string): number {
        return parseFloat(input.split('').reverse().join(''));
    }

}