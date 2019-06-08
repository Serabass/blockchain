import * as fs from "fs";
import {StringBlockChain} from './StringBlockChain';

(async () => {
    let stream = fs.createReadStream("block.txt");
    let chain = await StringBlockChain.fromStream(stream);
    await chain.save('block.txt');
    var j = JSON.stringify(chain, null, 4);
    console.log(j);
})();
