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
class SchemaFile {
    constructor(fileName = "js.tree.json") {
        this.contents = {};
        this.fileName = "js.tree.json";
        this.schemaDataObj = {};
        this.fileName = fileName;
        this.schemaDataObj = this.read();
    }
    objectsFromSchema() {
        return this.schemaDataObj.versions[0].objects;
    }
    setObjects(objects) {
        this.schemaDataObj.versions[0].objects = objects;
    }
    fileType(filename) {
        return this.fileName.split(".").pop() || "";
    }
    read() {
        let contents = fs.readFileSync(this.fileName, "utf8");
        return JSON.parse(contents);
    }
    writeFile() {
        fs.writeFile("schemaOutput/clean_application.test.json", JSON.stringify(this.schemaDataObj), function (err) {
            if (err)
                return console.log(err);
        });
    }
}
exports.default = SchemaFile;
