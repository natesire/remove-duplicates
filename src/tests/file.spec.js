"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let schemaFilename;
beforeAll(() => {
    schemaFilename = path_1.default.join(__dirname, 'mock.json');
});
it('should remove duplicate field by key', () => {
    let schemaNormalized = JSON.parse(fs_1.default.readFileSync(schemaFilename, 'utf8'));
    fs_1.default.writeFileSync('src/clean_application.json', JSON.stringify(schemaNormalized, null, 2));
});
it('dir path should not contain duplicate files', () => {
    expect(__dirname).toContain('src\\tests');
});
it('dir path should not contain duplicate files', () => {
    //expect file to exist
    expect(fs_1.default.existsSync('src\\tests\\mock.json')).toBe(true);
});
