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
        let schemaFilename = path_1.default.join(__dirname, "mock.json");
        let schemaFile = new SchemaFile_js_1.default(schemaFilename);
        let schemaObj = schemaFile.schema;
        let schema = new Schema_js_1.default(schemaObj);
        let objectsWithDups = schemaFile.objectsFromSchema();
        let dupsRemovedObjects = schema.uniqueArrayOfObjects(objectsWithDups);
        schemaFile.setObjects(dupsRemovedObjects);
        schemaFile.writeFile();
    });
});
