"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const yaml = require('js-yaml');
class FileManager {
    constructor(fileName = 'js.tree.json') {
        this.contents = {};
        this.fileName = 'js.tree.json';
        this.fileName = fileName;
        this.read();
    }
    fileType(filename) {
        return this.fileName.split('.').pop() || '';
    }
    read() {
        if (this.fileType(this.fileName) == 'yaml')
            this.contents = this.readYAMLToObject();
        if (this.fileType(this.fileName) == 'json')
            this.contents = this.readJsonToString();
        return this.contents;
    }
    readJsonToString() {
        return fs.readFileSync(this.fileName, 'utf8');
    }
    readYAMLToObject() {
        return yaml.load(fs.readFileSync(this.fileName, { encoding: 'utf-8' }));
    }
    writeToFile(data) {
        fs.writeFile('js.tree.json', data, function (err) {
            if (err)
                return console.log(err);
        });
    }
    yamlToObject(data) {
        return JSON.parse(data);
    }
}
exports.default = FileManager;
