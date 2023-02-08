import Tree from '../Tree';
import FileManager from '../FileManager';
import TreeLiteral from '../Types';
import TreeNode from '../Types';

// in case we want to deal with code
let dataTreeJS : TreeLiteral = {
    "statement": "statement0",
    "question": "question0 what are you searching for?",
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
    describe('from file', () => {
        let treeFile : FileManager;
        let dataObj : Object;
        let tree : Tree;
        let treeRoot : TreeNode; 

        beforeEach(() => {
            treeFile = new FileManager('data/schedule.tree.yaml');
            dataObj = treeFile.read();
            tree = new Tree(dataObj);
            treeRoot = tree.root;
        });

        it("should load tree from file", () => {
            expect(treeRoot['question']).toMatch('schedule')
        });
    });

    describe('from literal', () => {
        let tree : Tree;
        let treeRoot : TreeNode; 
        beforeEach(() => {
            tree = new Tree(dataTreeJS);
            treeRoot = tree.root;
        });

        it("should load tree from literal", () => {
            expect(treeRoot['question']).toMatch('question0')
        });

    
        it("should return tree data", () => {
            expect(treeRoot['statement']).toMatch('statement0')
        });
    });

    it('DEBUG should add children to queue for breadth first search', () => {
        let queue :     Array<Tree> = [];

        const tree1 = new Tree(dataTreeJS);
        const tree2 = new Tree(dataTreeJS);

        queue = tree1.addChildrenToQueue([tree2]); // queue for breadth first search
        expect(queue.length).toBe(2);
    });
    
    /*
    it("should search first level", () => {
        const tree = new Tree(dataTreeJS);
        let search = tree.search('statement1')
        expect(search['question']).toMatch('question0')
    });

    /*
    it("DEBUG should search zero level", () => {
        const tree = new Tree(dataTreeJS);
        let search = tree.getChildren()
        expect(search).toMatch('')
    });
    */
});
