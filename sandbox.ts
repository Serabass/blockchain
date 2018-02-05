import * as fs from "fs";
import {BlockChain} from "./blockchain";

(async () => {
    var stream = fs.createReadStream('block.txt');
    var result = await BlockChain.fromStream(stream);
    console.log(result);
})();