import * as fs from "fs";
import {BlockChain} from "./blockchain";

let stream = fs.createReadStream("block.txt");
let chain = BlockChain.fromStream(stream);
