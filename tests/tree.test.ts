import Tree from '../Tree';
import FileManager from '../FileManager';
import TreeLiteral from '../Types';
import TreeNode from '../Types';
import '../Array'; // bad practice modiying global array prototype

// in case we want to deal with code
let dataTreeJS0 : TreeLiteral = {
    "statement": "statement0",
    "question": "question0 what are you searching for?",
    "subNodes": {
        1: {
            "statement": "statement1",
            "question": "question1",
            "children": { }
        },
        2: {
            "statement": "statement2",
            "question": "question2",
            "children": { }
        },
    }
}

let dataTreeJS1 : TreeLiteral = {
    "statement": "statement0",
    "question": "question0 what are you searching for?",
    "subNodes": {
        1: {
            "statement": "statement1",
            "question": "question1",
            "children": { }
        },
        2: {
            "statement": "statement2",
            "question": "question2",
            "children": { }
        },
    }
}

let dataTreeJS2 : TreeLiteral = {
    "statement": "statement0",
    "question": "question0 what are you searching for?",
    "subNodes": {
        1: {
            "statement": "statement1",
            "question": "question1",
            "children": { }
        },
        2: {
            "statement": "statement2",
            "question": "question2",
            "children": { }
        },
    }
}

let dataTreeJS3 : TreeLiteral = {
    "statement": "statement0",
    "question": "question0 what are you searching for?",
    "subNodes": {
        1: {
            "statement": "statement1",
            "question": "question1",
            "children": { }
        },
        2: {
            "statement": "statement2",
            "question": "question2",
            "children": { }
        },
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
            tree = new Tree(dataTreeJS0);
            treeRoot = tree.root;
        });

        it("should load tree from literal", () => {
            expect(treeRoot['question']).toMatch('question0')
        });

    
        it("should return tree data", () => {
            expect(treeRoot['statement']).toMatch('statement0')
        });
    });

    describe('breadth first search', () => {
        let trees : Array<Tree> = [];

        beforeEach(() => {
            trees = [];
            trees.push(new Tree(dataTreeJS0));
            trees.push(new Tree(dataTreeJS1));
            trees.push(new Tree(dataTreeJS2));
            trees.push(new Tree(dataTreeJS3)); // what if one is a copy?
        });

        it('should add one child to queue for breadth first search BFS', () => {
            let treeAlgoOn = trees.root();
            let firstChildNode = trees[1]
            let queueBFS = treeAlgoOn.addChildrenToQueue(firstChildNode); 
            expect(queueBFS.length).toBe(1);
        });

        it('should add children Array to queue for breadth first search', () => {
            let treeAlgoOn = trees.root();
            let secondChildNode = trees[2]
            let queue = treeAlgoOn.addChildrenToQueue([secondChildNode]); // queue for breadth first search
            expect(queue.length).toBe(1);
        });

        it('should add two children to queue for breadth first search BFS', () => {
            let treeAlgoOn = trees.root();
            let thirdChildNode = trees[3];
            treeAlgoOn.addChildrenToQueue([trees[1]]);
            let queue = treeAlgoOn.addChildrenToQueue([thirdChildNode]); // queue for breadth first search
            expect(queue.length).toBe(2);
        });

        //               0
        //          /          \
        //        1             2
        //     3    4        5    6
        //   7 8    9 10  11 12   13 14

        // queue: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14

        // when searched or next level is complete, keep two levels in memory
        it('should remove first child from queue when ???', () => {
            let treeAlgoOn = trees.root();
            let firstChildNode = trees[1];
            let secondChildNode = trees[2];
            treeAlgoOn.addChildrenToQueue(firstChildNode);
            let queue = treeAlgoOn.addChildrenToQueue(secondChildNode); // queue for breadth first search
            expect(queue.length).toBe(2);
        });

        it('add sub node', () => {
            let wholeTree = new Tree({});
            wholeTree.addSubNode(trees[1])
            expect(wholeTree.subNodes.length).toBe(1);
        });

        it('add sub node to sub node', () => {
            let wholeTree = new Tree({});
            let subNode1 = wholeTree.addSubNode(trees[1]);
            subNode1.addSubNode(trees[2]);
            expect(wholeTree.subNodes.length).toBe(1);
        });


        /*it('should match concatenated TreeNode', () => {
            trees[0].addChildrenToQueue([trees[1]]);
            let queue = trees[0].addChildrenToQueue([trees[2]]); // queue for breadth first search

            expect(queue.length).toBe(2);
        });*/
    });
    
    /*
    it("should search first level", () => {
        const tree = new Tree(dataTreeJS);
        let search = tree.search('statement1')
        expect(search['question']).toMatch('question0')
    });

    /*
    it("should search zero level", () => {
        const tree = new Tree(dataTreeJS);
        let search = tree.getChildren()
        expect(search).toMatch('')
    });
    */
});
