import { Tree } from '../tree';
import FileManager from '../fileManager';
import { TreeType } from '../types';

let dataTreeLiteral : TreeType = {
    "statement": "I am here to help you find the answer to your question",
    "question": "what are you searching for?",
    "yes": {
        "statement": "This expression is not callable",
        "question": "javascript",
        "yes": {
            "statement": "This expression is not callable",
            "question": "is it defined as a function?",
            "yes": {
                "statement": "This expression is not callable",
                "question": "imports",
            },

        "no": {
            "statement": "This expression is not callable",
            "question": "is it defined as a function?",
            },
        } 
    }
}

describe("class Question", () => {
    it("should load tree from file", () => {
        const treeFile = new FileManager('js.tree.json');
        const tree = new Tree(treeFile);
        expect(tree.data).toMatch(/what are you searching for/)
    });

    it("should load tree from literal", () => {
        const tree = new Tree(dataTreeLiteral); // returning object
        expect(tree.data).toMatchObject({"question": "what are you searching for?"});
    });
});