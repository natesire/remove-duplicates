"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Schema_js_1 = __importDefault(require("../Schema.js"));
describe("Class Schema", () => {
    let schemaFilename;
    let schemaInstance;
    let schemaContentFromFile;
    beforeAll(() => {
        schemaFilename = "mock.json";
        schemaContentFromFile = fs_1.default.readFileSync(schemaFilename, "utf8");
    });
    it("should instantiate Schema", () => {
        let schemaObj = JSON.parse(schemaContentFromFile);
        schemaInstance = new Schema_js_1.default(schemaObj);
        expect(schemaInstance).toBeTruthy();
    });
    it("should parse JSON from file", () => {
        expect(JSON.parse(schemaContentFromFile)).toBeTruthy();
    });
    it("should get schema", () => {
        let schemaObj = JSON.parse(schemaContentFromFile);
        schemaInstance = new Schema_js_1.default(schemaObj);
        expect(schemaInstance.getSchema()).toBeTruthy();
    });
    it("should get schema", () => {
        let schemaObj = JSON.parse(schemaContentFromFile);
        schemaInstance = new Schema_js_1.default(schemaObj);
        expect(schemaInstance.getSchema()).toBeTruthy();
    });
    it("should get schema item by key", () => {
        let schemaObj = JSON.parse(schemaContentFromFile);
        schemaInstance = new Schema_js_1.default(schemaObj);
        expect(schemaInstance.getSchema('versions')).toBeTruthy();
    });
    it("should remove duplicate key", () => {
        let schemaObj = JSON.parse(schemaContentFromFile);
        expect(Object.entries(schemaObj).length).toBe(1);
    });
    /*
        
            it('should count fields', () => {
              let schema = JSON.parse(fs.readFileSync(schemaFilenameWithPath, 'utf8'));
              expect(schemaInstance.getFieldsFromSchema()).toEqual('object');
            });
        
            it('should remove duplicate field by key', () => {
              let schemaNormalized = JSON.parse(fs.readFileSync(schemaFilenameWithPath, 'utf8'));
              fs.writeFileSync('src/clean_application.json', JSON.stringify(schemaNormalized, null, 2));
            });
        
            it('should count number of objects', () => {
              let schema = JSON.parse(fs.readFileSync(schemaFilenameWithPath, 'utf8'));
              expect(Object.entries(schema).length).toEqual(1);
            });
            */
});
