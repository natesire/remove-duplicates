import FileManager from '../FileManager';
import Tree from '../Tree';

describe("class", () => {
    let treeFile : FileManager;

    beforeAll(() => {
        treeFile = new FileManager('data/schedule.tree.yaml');
    });

    it("should return property", () => {
        let fileContents = treeFile.read();
        let tree = new Tree(fileContents);
        expect(tree['root']['statement']).toMatch(/schedule/)
    });
});