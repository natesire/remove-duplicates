import { Tree } from '../tree';
import FileManager from '../fileManager';
import TreeLiteral from '../types';

let dataTreeJS : TreeLiteral = {
    "statement": "statement0",
    "question": "question0",
    "yay": {
        "statement": "statement1",
        "question": "question1",
        "yay": {
            "statement": "statement2",
            "question": "question2",
            "yay": {
                "statement": "statement3",
                "question": "question3",
            },

        "nay": {
            "statement": "statement4",
            "question": "question4",
            },
        } 
    }
}

describe("class Tree", () => {
    it("should load tree from file", () => {
        const treeFile = new FileManager('js.tree.json');
        const tree = new Tree(treeFile);
        expect(tree.data['data']).toMatchObject({"question": "what are you searching for?"});
    });

    it("should load tree from literal", () => {
        const tree = new Tree(dataTreeJS);
        expect(tree.data).toMatchObject({"question": "question0"});
    });

    it("should return tree data", () => {
        const tree = new Tree(dataTreeJS);
        let treeData = tree['data'];
        expect(treeData['statement']).toMatch('statement0');
    });

    it("should search first level", () => {
        const tree = new Tree(dataTreeJS);
        let search = tree.search('statement1');
        expect(search).toMatchObject({"question": "question1"});
    });

    /*it("should search second level", () => {
        const tree = new Tree(dataTreeJS);
        let search = tree.search('statement2');
        expect(search).toMatchObject({"question": "question2"});
    });*/
});