import * as fs from "fs";
import {BlockChain} from "./blockchain";

(async () => {
    let stream = fs.createReadStream("block.txt");
    let chain = await BlockChain.fromStream(stream);
})();
