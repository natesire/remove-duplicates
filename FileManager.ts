import * as fs from 'fs';
const yaml = require('js-yaml');

export default class FileManager {
    contents: Object = {};
    fileName: string = 'js.tree.json';
    constructor(fileName:string = 'js.tree.json') {
        this.fileName = fileName
        this.read();
    }

    fileType(filename: string) : string {
        return this.fileName.split('.').pop() || '';
    }

    read() : Object {
        if(this.fileType(this.fileName) == 'yaml') this.contents = this.readYAMLToObject();
        if(this.fileType(this.fileName) == 'json') this.contents = this.readJsonToString();
        return this.contents;
    }

    readJsonToString() : string {
        return fs.readFileSync(this.fileName, 'utf8')
    }

    readYAMLToObject() : Object {
        return yaml.load(fs.readFileSync(this.fileName, {encoding: 'utf-8'}));
    }

    writeToFile(data: string) {
        fs.writeFile('js.tree.json', data, function (err) {
            if (err) return console.log(err);
        });
    }

    yamlToObject(data: string) : Object {
        return JSON.parse(data);
    }
}