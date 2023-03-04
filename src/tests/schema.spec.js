"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Schema_js_1 = __importDefault(require("../Schema.js"));
const path_1 = __importDefault(require("path"));
describe("Class Schema", () => {
    let schemaFilename;
    let schemaInstance;
    let schemaContentFromFile;
    beforeAll(() => {
        schemaFilename = path_1.default.join(__dirname, 'mock.json');
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
    describe('standard NodeJS behavior', () => {
        describe('JSON', () => {
            it("parse should remove duplicate key", () => {
                let schemaObj = JSON.parse(schemaContentFromFile);
                expect(Object.entries(schemaObj).length).toBe(2);
            });
            it("should remove first duplicate key 'versions'", () => {
                let schemaObj = JSON.parse(schemaContentFromFile);
                expect(Object.entries(schemaObj['versions']).length).toBe(1);
            });
        });
    });
    /*
        
           
        
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
