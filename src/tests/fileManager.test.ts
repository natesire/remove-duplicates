import FileManager from '../FileManager';
import Tree from '../Tree';

describe(".FileManager", () => {
    let treeFile : FileManager;

    beforeAll(() => {
        treeFile = new FileManager('./src/data/schedule.tree.yaml');
    });

    it("should return value for fact", () => {
        let fileContents = treeFile.read();
    });
});