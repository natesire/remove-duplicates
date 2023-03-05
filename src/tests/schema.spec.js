"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_js_1 = __importDefault(require("../Schema.js"));
const path_1 = __importDefault(require("path"));
const SchemaFile_js_1 = __importDefault(require("../SchemaFile.js"));
describe("#Schema", () => {
    let schemaFilename;
    let schemaInstance;
    let schemaContentFromFile;
    let schemaObj;
    let objectsFromSchema;
    let schemaFile;
    beforeAll(() => {
        schemaFilename = path_1.default.join(__dirname, "mock.json");
        schemaFile = new SchemaFile_js_1.default(schemaFilename);
        objectsFromSchema = schemaFile.objectsFromSchema();
    });
    it("should setup instance with schema data", () => {
        let schemaObj = JSON.parse(schemaContentFromFile);
        schemaInstance = new Schema_js_1.default(schemaObj);
        expect(schemaInstance.schemaData).toBeTruthy();
    });
    it("should parse JSON from file", () => {
        expect(JSON.parse(schemaContentFromFile)).toBeTruthy();
    });
    it("should find key for duplicate object", () => {
        let schemaObj = JSON.parse(schemaContentFromFile);
        let lastObj = schemaObj["versions"][0]["objects"];
        expect(lastObj[0]).toEqual({ key: "object_1" });
    });
    it("should receive schema data with correct shape", () => {
        let schemaObj = JSON.parse(schemaContentFromFile);
        let lastObj = schemaObj["versions"][0]["objects"];
        let schema = new Schema_js_1.default(lastObj);
        expect(schema.schemaData[0]["key"]).toMatch(/object/);
    });
    it("should find duplicate keys inside object", () => {
        let literal2 = [];
        let literal = [{ key: 1 }, { key: 2 }];
        literal.map((item) => {
            literal2.push(item);
        });
        expect(literal2.length).toEqual(2);
    });
    it("should create unique map", () => {
        let uniqueObjects = new Map();
        let literal = [{ key: 1 }, { key: 1 }];
        literal.map((item) => {
            uniqueObjects.set(item.key, item);
        });
        expect(uniqueObjects.size).toEqual(1);
    });
    it("should return unique array of objects", () => {
        schemaInstance = new Schema_js_1.default(schemaFile.jsonParse());
        let literal = [{ key: 1 }, { key: 1 }, { key: 2 }];
        let unique = schemaInstance.uniqueArrayOfObjects(literal);
        unique;
        expect(unique.length).toEqual(2);
    });
    it("DEBUG should return unique array of objects retreived from schema", () => {
        let schema = new Schema_js_1.default(schemaFile.jsonParse());
        let objects = schemaFile.objectsFromSchema();
        let unique = schema.uniqueArrayOfObjects(objects);
        expect(unique.length).toEqual(2);
    });
});
