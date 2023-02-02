import * as fs from 'fs';
import { NodeTree } from './types';

export default class FileManager {
    fileName: string = 'js.tree.json';
    constructor(fileName:string = 'js.tree.json') {
        this.fileName = fileName
    }

    read() : string {
        return fs.readFileSync(this.fileName, 'utf8');
    }

    writeToFile(data: any, fileName: string) {
        let dataFormatted : string = 'default data';
        if(typeof data == 'object') {
            dataFormatted = JSON.stringify(data);
        }
        fs.writeFile(fileName, dataFormatted, function (err) {
            if (err) return console.log(err);
        });
    }
}