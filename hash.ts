import * as sha from "js-sha256";

export class Hash {
    static build(message: string) {
        return sha.sha256(message);
    }
}
