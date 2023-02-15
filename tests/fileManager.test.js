"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileManager_1 = __importDefault(require("../FileManager"));
const Tree_1 = __importDefault(require("../Tree"));
describe(".FileManager", () => {
    let treeFile;
    beforeAll(() => {
        treeFile = new FileManager_1.default('data/schedule.tree.yaml');
    });
    it("should return value for fact", () => {
        let fileContents = treeFile.read();
        let tree = new Tree_1.default(fileContents);
        expect(tree['rootNode']['fact']).toMatch(/schedule/);
    });
    it("should return value for question", () => {
        let fileContents = treeFile.read();
        let tree = new Tree_1.default(fileContents);
        expect(tree['rootNode']['question']).toMatch(/schedule/);
    });
    it("should return value for first node", () => {
        let fileContents = treeFile.read();
        let tree = new Tree_1.default(fileContents);
        expect(tree['rootNode']['q1']['question']).toMatch(/hours/);
    });
});
