import FileManager from '../FileManager';
import Tree from '../Tree';

describe(".FileManager", () => {
    let treeFile : FileManager;

    beforeAll(() => {
        treeFile = new FileManager('data/schedule.tree.yaml');
    });

    it("should return value for statement", () => {
        let fileContents = treeFile.read();
        let tree = new Tree(fileContents);
        expect(tree['root']['statement']).toMatch(/schedule/)
    });

    it("should return value for question", () => {
        let fileContents = treeFile.read();
        let tree = new Tree(fileContents);
        expect(tree['root']['question']).toMatch(/schedule/)
    });

    it("should return value for first node", () => {
        let fileContents = treeFile.read();
        let tree = new Tree(fileContents);
        expect(tree['root']['q1']['question']).toMatch(/hours/)
    });
});