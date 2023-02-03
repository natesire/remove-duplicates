import { Tree } from "../tree";
import FileManager from '../fileManager';

describe("class", () => {
    it("should return property", () => {
        const treeFile = new FileManager('js.tree.json');
        expect(treeFile.read()).toMatch(/what are you searching for/)
    });

    it("should write", () => {
        const treeFile = new FileManager('js.tree.json');
        expect(treeFile.read()).toMatch(/what are you searching for/)
    });
});