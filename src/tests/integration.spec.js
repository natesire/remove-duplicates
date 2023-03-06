"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SchemaFile_js_1 = __importDefault(require("../SchemaFile.js"));
const path_1 = __importDefault(require("path"));
const Schema_js_1 = __importDefault(require("../Schema.js"));
describe('App', () => {
    it('should read file, clean and then output new file', () => {
        // object_4 is duplicated in file, six total
        let schemaFilename = path_1.default.join(__dirname, "../schema/mock_application.json");
        let schemaFile = new SchemaFile_js_1.default(schemaFilename);
        let schemaObj = schemaFile.schemaDataObj;
        let schema = new Schema_js_1.default(schemaObj);
        let objectsWithDups = schemaFile.objectsFromSchema();
        let dupsRemovedObjects = schema.uniqueArrayOfObjects(objectsWithDups);
        schemaFile.setObjects(dupsRemovedObjects);
        schemaFile.writeOutputFile("schemaOutput/clean_application.test.1.json");
        // ensure no duplicates by counting number of objects
        let fileCleanOutput = new SchemaFile_js_1.default("schemaOutput/clean_application.test.1.json");
        let outputFileObj = fileCleanOutput.read();
        expect(outputFileObj.versions[0].objects.length).toEqual(5); // remove 1 duplicated object
    });
    it('should read file and remove duplicate objects', () => {
        let schemaFilename = path_1.default.join(__dirname, "mock.json");
        let schemaFile = new SchemaFile_js_1.default(schemaFilename);
        let schemaObj = schemaFile.schemaDataObj;
        let schema = new Schema_js_1.default(schemaObj);
        let objectsWithDups = schemaFile.objectsFromSchema();
        let dupsRemovedObjects = schema.uniqueArrayOfObjects(objectsWithDups);
        expect(dupsRemovedObjects.length).toEqual(2);
    });
    it('should read file and remove duplicate objects and set clean objects', () => {
        let schemaFilename = path_1.default.join(__dirname, "mock.json");
        let schemaFile = new SchemaFile_js_1.default(schemaFilename);
        let schemaObj = schemaFile.schemaDataObj;
        let schema = new Schema_js_1.default(schemaObj);
        let objectsWithDups = schemaFile.objectsFromSchema();
        let dupsRemovedObjects = schema.uniqueArrayOfObjects(objectsWithDups);
        schemaFile.setObjects(dupsRemovedObjects);
        expect(schemaFile.objectsFromSchema().length).toEqual(2);
    });
});
