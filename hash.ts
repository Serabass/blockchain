import * as sha from "js-sha256";

export class Hash {
    public static build(message: string) {
        return sha.sha256(message);
    }
}
