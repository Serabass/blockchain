import * as fs from "fs";
import {StringBlockChain} from './StringBlockChain';

(async () => {
    let stream = fs.createReadStream("block.txt");
    let chain = await StringBlockChain.fromStream(stream);
    console.log(chain);
})();
