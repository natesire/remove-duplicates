"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Schema_js_1 = __importDefault(require("../Schema.js"));
describe('schema', () => {
    let schemaFilenameWithPath;
    let schemaInstance;
    beforeAll(() => {
        schemaFilenameWithPath = 'mock.json';
        //schemaInstance = new Scheme(fs.readFileSync(schemaFilenameWithPath, 'utf8'));
    });
    describe('setup', () => {
        it('should stringify schema as a string', () => {
            let schemaObj = {
                test: "test"
            };
            let str = JSON.stringify(schemaObj);
            expect(str).toMatch('test');
        });
    });
    describe('scheme', () => {
        it('should find content', () => {
            let schemaContent = fs_1.default.readFileSync(schemaFilenameWithPath, 'utf8');
            expect(JSON.parse(schemaContent)).toBeTruthy();
        });
        it('should receive an object', () => {
            let schemaContent = fs_1.default.readFileSync(schemaFilenameWithPath, 'utf8');
            let schemaObj = JSON.parse(schemaContent);
            schemaInstance = new Schema_js_1.default(schemaObj);
            expect(schemaInstance).toBeTruthy();
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
});
