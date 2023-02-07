"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileManager_1 = __importDefault(require("../FileManager"));
const Tree_1 = __importDefault(require("../Tree"));
describe("class", () => {
    let treeFile;
    beforeAll(() => {
        treeFile = new FileManager_1.default('data/schedule.tree.yaml');
    });
    it("should return property", () => {
        let fileContents = treeFile.read();
        let tree = new Tree_1.default(fileContents);
        expect(tree['root']['statement']).toMatch(/schedule/);
    });
});
