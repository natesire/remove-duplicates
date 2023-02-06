import { Tree } from '../Tree';
import FileManager from '../FileManager';
import TreeLiteral from '../Types';

// in case we want to deal with code
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
        let data = treeFile.read();

        const tree = new Tree(data);
        let treeObj = tree.toObject(tree.root) as Tree; // cast to Tree so root is defined, solves: Property 'root' does not exist on type 'Object'
        expect(treeObj.root).toMatchObject({"question": "what are you searching for?"});
    });

    describe('from literal', () => {
        let tree : Tree;
        beforeEach(() => {
            tree = new Tree(dataTreeJS);
        });

        it("should load tree from literal", () => {
            expect(tree.root).toMatchObject({"question": "question0"});
        });

    
        it("should return tree data", () => {
            expect(tree.root['statement']).toMatch('statement0');
        });
    });
    
    /*
    it("should search first level", () => {
        const tree = new Tree(dataTreeJS);
        let search = tree.search('statement1');
        expect(search).toMatchObject({"question": "question1"});
    });

    it("should search second level", () => {
        const tree = new Tree(dataTreeJS);
        let search = tree.search('statement2');
        expect(search).toMatchObject({"question": "question2"});
    });*/
});