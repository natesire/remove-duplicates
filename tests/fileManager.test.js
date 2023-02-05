"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileManager_1 = __importDefault(require("../FileManager"));
describe("class", () => {
    it("should return property", () => {
        const treeFile = new FileManager_1.default('js.tree.json');
        expect(treeFile.read()).toMatch(/what are you searching for/);
    });
    it("should write", () => {
        const treeFile = new FileManager_1.default('js.tree.json');
        expect(treeFile.read()).toMatch(/what are you searching for/);
    });
});
