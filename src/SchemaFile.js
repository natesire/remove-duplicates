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
    constructor(fileName) {
        this.contents = {};
        this.schemaDataObj = {};
        this.fileName = fileName;
        this.schemaDataObj = this.read();
        this.keyPath = [];
    }
    // this will replace getters and setters and make the code more maintainable
    // save the key path to a cache to prevent from re-running this function
    // use recursion to find key with depth first search
    findKeyInSchema(findKey, schema) {
        if (schema[findKey]) {
            console.log("found key in schema");
            console.log(schema);
            return this.keyPath;
        }
        else {
            for (const [k, value] of Object.entries(schema)) {
                if (typeof schema[k] === "object") {
                    this.keyPath.push(k);
                    return this.findKeyInSchema(findKey, schema[k]);
                }
            }
        }
        return this.keyPath;
    }
    objectsFromSchema() {
        // there should only be one versions, [0]
        return this.schemaDataObj.versions[0].objects;
    }
    fieldsFromSchema(objectIndex) {
        let fields = this.objectsFromSchema()[objectIndex].fields;
        return fields;
    }
    setFields(objectIndex, fields) {
        this.objectsFromSchema()[objectIndex].fields = fields;
    }
    setObjects(objects) {
        this.schemaDataObj.versions[0].objects = objects;
    }
    fileType(filename) {
        return this.fileName.split(".").pop() || "";
    }
    read() {
        let output = {};
        let contents = fs.readFileSync(this.fileName, "utf8");
        try {
            output = JSON.parse(contents);
        }
        catch (e) {
            throw new Error(`${this.fileName} file cannot be parsed as JSON`);
        }
        return output;
    }
    writeOutputFile(outputFile) {
        // validate the JSON
        let jsonStr = JSON.stringify(this.schemaDataObj, null, 2);
        let jsonObj = JSON.parse(jsonStr);
        fs.writeFileSync(outputFile || "schemaOutput/clean_application.test.json", jsonStr);
    }
}
exports.default = SchemaFile;
