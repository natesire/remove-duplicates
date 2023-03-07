"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SchemaFile_js_1 = __importDefault(require("../SchemaFile.js"));
const path_1 = __importDefault(require("path"));
const Schema_js_1 = __importDefault(require("../Schema.js"));
describe('App', () => {
    it('DEBUG should read file, clean and then output new file', () => {
        // object_4 is duplicated in file, six total
        let schemaFilenameInput = path_1.default.join(__dirname, "../schema/mock_application.json");
        let schemaFile = new SchemaFile_js_1.default(schemaFilenameInput);
        let schemaObj = schemaFile.schemaDataObj;
        let cleanFilenameOutput1 = "schemaOutput/clean_application.integration.test.1.json";
        let schema = new Schema_js_1.default(schemaObj);
        let objectsWithDups = schemaFile.objectsFromSchema();
        let dupsRemovedObjects = schema.uniqueArrayOfObjects(objectsWithDups);
        schemaFile.setObjects(dupsRemovedObjects);
        schemaFile.writeOutputFile(cleanFilenameOutput1);
        // ensure no duplicates by counting number of objects
        let fileCleanOutput = new SchemaFile_js_1.default(cleanFilenameOutput1);
        let outputFileObj = fileCleanOutput.read();
        expect(outputFileObj.versions[0].objects.length).toEqual(5); // remove 1 duplicated object
        let i = 0;
        outputFileObj.versions[0].objects.forEach((object) => {
            schemaObj.versions[0].objects[i].fields = schema.uniqueArrayOfObjects(object.fields);
            i++;
        });
        schemaFile.schemaDataObj = schemaObj;
        schemaFile.writeOutputFile("schemaOutput/clean_application.test.2.json");
        //read file
        let finalFile = new SchemaFile_js_1.default("schemaOutput/clean_application.test.2.json");
        let fields = finalFile.schemaDataObj.versions[0].objects[0].fields;
        expect(fields.length).toBe(6);
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
