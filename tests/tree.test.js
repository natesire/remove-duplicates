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
    "statement": "statement0",
    "question": "question0 what are you searching for?",
    "children": {
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
let dataTreeJS1 = {
    "statement": "statement0",
    "question": "question0 what are you searching for?",
    "children": {
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
    "statement": "statement0",
    "question": "question0 what are you searching for?",
    "children": {
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
    "statement": "statement0",
    "question": "question0 what are you searching for?",
    "children": {
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
        let treeFile;
        let dataObj;
        let tree;
        let treeRoot;
        beforeEach(() => {
            treeFile = new FileManager_1.default('data/schedule.tree.yaml');
            dataObj = treeFile.read();
            tree = new Tree_1.default(dataObj);
            treeRoot = tree.root;
        });
        it("should load tree from file", () => {
            expect(treeRoot['question']).toMatch('schedule');
        });
    });
    describe('from literal', () => {
        let tree;
        let treeRoot;
        beforeEach(() => {
            tree = new Tree_1.default(dataTreeJS0);
            treeRoot = tree.root;
        });
        it("should load tree from literal", () => {
            expect(treeRoot['question']).toMatch('question0');
        });
        it("should return tree data", () => {
            expect(treeRoot['statement']).toMatch('statement0');
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
        it('add child node under node', () => {
            let treeAlgoOn = new Tree_1.default({});
            treeAlgoOn.addChild(trees[1]);
            expect(treeAlgoOn.children.length).toBe(1);
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
