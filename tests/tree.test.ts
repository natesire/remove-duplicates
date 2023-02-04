import { Tree } from '../tree';
import FileManager from '../fileManager';
import TreeLiteral from '../types';

let dataTreeJS : TreeLiteral = {
    "statement": "I am here to help you find the answer to your question",
    "question": "what question do you have about JS?",
    "yay": {
        "statement": "This expression is not callable",
        "question": "javascript",
        "yay": {
            "statement": "This expression is not callable",
            "question": "is it defined as a function?",
            "yay": {
                "statement": "This expression is not callable",
                "question": "imports",
            },

        "nay": {
            "statement": "This expression is not callable",
            "question": "is it defined as a function?",
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
        expect(tree.data).toMatchObject({"question": "what question do you have about JS?"});
    });

    it("should return tree data", () => {
        const tree = new Tree(dataTreeJS);
        let treeData = tree['data'];
        expect(treeData['statement']).toEqual('I am here to help you find the answer to your question');
    });

    it("should search first level", () => {
        const tree = new Tree(dataTreeJS);
        let search = tree.search('expression');
        expect(search).toMatchObject({"question": "javascript"});
    });
});