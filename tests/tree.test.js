"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tree_1 = __importDefault(require("../Tree"));
const FileManager_1 = __importDefault(require("../FileManager"));
require("../Array"); // bad practice modiying global array prototype
// in case we want to deal with code
let dataTreeJS0 = {
    "fact": "statement0",
    "question": "question0 what are you searching for?",
    "subNodes": {
        1: {
            "fact": "javascript",
            "question": "do you have a question about javascript?",
            "children": {
                1: {
                    "fact": "react",
                    "question": "do you have a question about react?",
                    "children": {}
                },
            }
        },
        2: {
            "fact": "College",
            "question": "do you have a question about College?",
            "children": {
                1: {
                    "statement": "calculus",
                    "question": "do you have a question about calculus?",
                    "children": {}
                },
                2: {
                    "statement": "physics",
                    "question": "do you have a question about physics?",
                    "children": {}
                }
            }
        },
        4: {
            "statement": "health",
            "question": "do you have a question about health?",
            "children": {
                1: {
                    "statement": "Scoliosis",
                    "question": "do you have a question about Scoliosis?",
                    "children": {}
                },
                2: {
                    "statement": "Weight",
                    "question": "do you have a question about Weight?",
                    "children": {}
                }
            }
        },
        5: {
            "statement": "AWS",
            "question": "do you have a question about AWS?",
            "children": {}
        },
    }
};
let dataTreeJS1 = {
    "fact": "statement0",
    "question": "question0 what are you searching for?",
    "subNodes": {
        1: {
            "statement": "statement1",
            "question": "question1",
            "children": {}
        },
        2: {
            "statement": "statement2",
            "question": "question2",
            "children": {}
        },
    }
};
let dataTreeJS2 = {
    "fact": "statement0",
    "question": "question0 what are you searching for?",
    "subNodes": {
        1: {
            "statement": "statement1",
            "question": "question1",
            "children": {}
        },
        2: {
            "statement": "statement2",
            "question": "question2",
            "children": {}
        },
    }
};
let dataTreeJS3 = {
    "fact": "statement0",
    "question": "question0 what are you searching for?",
    "subNodes": {
        1: {
            "statement": "statement1",
            "question": "question1",
            "children": {}
        },
        2: {
            "statement": "statement2",
            "question": "question2",
            "children": {}
        },
    }
};
describe("class Tree", () => {
    describe('from file', () => {
        let fileManager;
        let dataFromFile;
        let tree;
        let rootNode;
        beforeEach(() => {
            fileManager = new FileManager_1.default('data/schedule.tree.yaml');
            dataFromFile = fileManager.read();
            tree = new Tree_1.default(dataFromFile);
            rootNode = tree.rootNode;
        });
        it("should search for schedule", () => {
            expect(tree.search('schedule')).toMatch(/schedule/i);
        });
        it("should match question", () => {
            expect(rootNode['question']).toMatch(/schedule/);
        });
        it("should match fact", () => {
            expect(rootNode['fact']).toMatch(/schedule/);
        });
    });
    describe('from literal', () => {
        let tree;
        let treeRoot;
        beforeEach(() => {
            tree = new Tree_1.default(dataTreeJS0);
            treeRoot = tree.rootNode;
        });
        it("should load tree from literal", () => {
            expect(treeRoot['question']).toMatch('question0');
        });
        it("should return tree data", () => {
            expect(treeRoot['fact']).toMatch('statement0');
        });
    });
    describe('breadth first search', () => {
        let trees = [];
        beforeEach(() => {
            trees = [];
            trees.push(new Tree_1.default(dataTreeJS0));
            trees.push(new Tree_1.default(dataTreeJS1));
            trees.push(new Tree_1.default(dataTreeJS2));
            trees.push(new Tree_1.default(dataTreeJS3)); // what if one is a copy?
        });
        it('should add one child to queue for breadth first search BFS', () => {
            let treeAlgoOn = trees.root();
            let firstChildNode = trees[1];
            let queueBFS = treeAlgoOn.addChildrenToQueue(firstChildNode);
            expect(queueBFS.length).toBe(1);
        });
        it('should add children Array to queue for breadth first search', () => {
            let treeAlgoOn = trees.root();
            let secondChildNode = trees[2];
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
            let wholeTree = new Tree_1.default({});
            wholeTree.addSubNode(trees[1]);
            expect(wholeTree.subNodes.length).toBe(1);
        });
        it('add sub node to sub node', () => {
            let wholeTree = new Tree_1.default({});
            let subNode1 = wholeTree.addSubNode(trees[1]);
            subNode1.addSubNode(trees[2]);
            expect(wholeTree.subNodes.length).toBe(1);
        });
        it('add 2 sub nodes to sub node', () => {
            let wholeTree = new Tree_1.default({});
            let subNode1 = wholeTree.addSubNode(trees[1]);
            subNode1.addSubNode(trees[2]);
            subNode1.addSubNode(trees[3]);
            expect(subNode1.subNodes.length).toBe(2);
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
