"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Schema_js_1 = __importDefault(require("../Schema.js"));
describe("Schema", () => {
    let schemaFilenameWithPath;
    let schemaInstance;
    let schemaContent;
    let schemaObj = {
        versions: "test",
    };
    beforeAll(() => {
        schemaFilenameWithPath = "mock.json";
        schemaContent = fs_1.default.readFileSync(schemaFilenameWithPath, "utf8");
    });
    it("should receive an object", () => {
        let schemaObj = JSON.parse(schemaContent);
        schemaInstance = new Schema_js_1.default(schemaObj);
        expect(schemaInstance).toBeTruthy();
    });
    it("should stringify schema as a string", () => {
        let str = JSON.stringify(schemaObj);
        expect(str).toMatch("test");
    });
    it("should find content", () => {
        expect(JSON.parse(schemaContent)).toBeTruthy();
    });
    it("should get schema", () => {
        let schemaObj = JSON.parse(schemaContent);
        schemaInstance = new Schema_js_1.default(schemaObj);
        expect(schemaInstance.getSchema()).toBeTruthy();
    });
    it("should get Gloss", () => {
        let schemaObj = JSON.parse(schemaContent);
        schemaInstance = new Schema_js_1.default(schemaObj);
        expect(schemaInstance.getSchema()["versions"]).toBeTruthy();
    });
    /*
    it("should get item", () => {
      let schemaObj = JSON.parse(schemaContent);
      schemaInstance = new Schema(schemaObj);
      expect(schemaInstance.getSchemaItem('versions')).toBeTruthy();
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
