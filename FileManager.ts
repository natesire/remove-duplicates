import * as fs from 'fs';
import { NodeTree } from './types';

export default class FileManager {
    fileName: string = 'js.tree.json';
    constructor(fileName:string = 'js.tree.json') {
        this.fileName = fileName
    }

    read() : string {
        return fs.readFileSync('js.tree.json', 'utf8');
    }

    writeToFile(data: any) {
        let dataFormatted : string = 'default data';
        if(typeof data == 'object') {
            dataFormatted = JSON.stringify(data);
        }
        fs.writeFile('js.tree.json', dataFormatted, function (err) {
            if (err) return console.log(err);
        });
    }
}