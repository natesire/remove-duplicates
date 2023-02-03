import { Tree } from "../tree";
import FileManager from '../fileManager';

describe("class", () => {
    it("should return property", () => {
        const treeFile = new FileManager('js.tree.json');
        const tree = new Tree(treeFile);
        expect(tree.data).toMatch(/what are you searching for/)
    });
});