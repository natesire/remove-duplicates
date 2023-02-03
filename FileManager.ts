import * as fs from 'fs';
import { TreeType } from './types';

export default class FileManager {
    fileName: string = 'js.tree.json';
    constructor(fileName:string = 'js.tree.json') {
        this.fileName = fileName
    }

    read() : string {
        return fs.readFileSync(this.fileName, 'utf8');
    }

    writeToFile(data: string) {
        fs.writeFile('js.tree.json', data, function (err) {
            if (err) return console.log(err);
        });
    }
}