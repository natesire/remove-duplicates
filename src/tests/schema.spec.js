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
            it("parse should remove duplicate JSON object by key", () => {
                let schemaObj = JSON.parse(schemaContentFromFile);
                expect(Object.entries(schemaObj).length).toBe(1);
            });
            it("should return last duplicate JSON object according to IEEE", () => {
                let schemaObj = JSON.parse(schemaContentFromFile);
                expect(Object.entries(schemaObj['versions'][0]['thirdKey'])).toEqual([["test", "test"]]);
            });
        });
    });
    it('should find key for duplicate object', () => {
        let schemaObj = JSON.parse(schemaContentFromFile);
        let lastObj = schemaObj['versions'][0]['objects'];
        expect(lastObj[0]).toEqual({ "key": "object_3" });
    });
    it('should find duplicate keys inside object', () => {
        let schemaObj = JSON.parse(schemaContentFromFile);
        let lastObj = schemaObj['versions'][0]['objects'];
        expect(Object.entries(lastObj).length).toEqual(2);
    });
    it('should find duplicate keys inside object', () => {
        let schemaObj = JSON.parse(schemaContentFromFile);
        let lastObj = schemaObj['versions'][0]['objects'];
        let schema = new Schema_js_1.default(lastObj);
        expect(schema).toEqual({ "schemaData": [{ "key": "object_3" }, { "key": "object_3" }] });
    });
    it('should find duplicate keys inside object', () => {
        let literal2 = [];
        let literal = [{ 'key': 1 }, { 'key': 2 }];
        literal.map(item => {
            literal2.push(item);
        });
        expect(literal2.length).toEqual(2);
    });
    it('should create unique map', () => {
        let uniqueObjects = new Map();
        let literal = [{ 'key': 1 }, { 'key': 1 }];
        literal.map(item => {
            uniqueObjects.set(item.key, item);
        });
        expect(uniqueObjects.size).toEqual(1);
    });
    it('should create unique map', () => {
        let uniqueObjects = new Map();
        let literal = [{ 'key': 1 }, { 'key': 1 }, { 'key': 2 }];
        literal.map(item => {
            uniqueObjects.set(item.key, item);
        });
        expect(uniqueObjects.size).toEqual(2);
    });
    /*
    it('should find duplicate keys inside object', () => {
        let schemaObj = JSON.parse(schemaContentFromFile);
        let lastObj = schemaObj['versions'][0]['objects'];
        let schema = new Schema(lastObj);
        schema.removeDuplicates();
  
        expect(schema.schemaData).toEqual({"schemaData": [{"key": "object_3"}, {"key": "object_3"}]});
    });
  */
});
