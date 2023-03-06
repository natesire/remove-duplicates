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
        schemaInstance = new Schema_js_1.default(schemaFile.schemaDataObj);
        let literal = [{ key: 1 }, { key: 1 }, { key: 2 }];
        let unique = schemaInstance.uniqueArrayOfObjects(literal);
        unique;
        expect(unique.length).toEqual(2);
    });
    it("should return unique array of objects retreived from schema", () => {
        let schema = new Schema_js_1.default(schemaFile.schemaDataObj);
        let objects = schemaFile.objectsFromSchema();
        let unique = schema.uniqueArrayOfObjects(objects);
        expect(unique.length).toEqual(2);
    });
    describe("fields", () => {
        it("should find seven fields since field_4 is duplicated", () => {
            schemaFilename = path_1.default.join(__dirname, "../schema/mock_application.json");
            schemaFile = new SchemaFile_js_1.default(schemaFilename);
            let fieldsFirstObject = schemaFile.objectsFromSchema()[0];
            expect(fieldsFirstObject.fields.length).toEqual(7);
        });
    });
});
