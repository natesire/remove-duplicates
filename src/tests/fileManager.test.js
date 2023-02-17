"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileManager_1 = __importDefault(require("../FileManager"));
describe(".FileManager", () => {
    let treeFile;
    beforeAll(() => {
        treeFile = new FileManager_1.default('./src/data/schedule.tree.yaml');
    });
    it("should return value for fact", () => {
        let fileContents = treeFile.read();
    });
});
