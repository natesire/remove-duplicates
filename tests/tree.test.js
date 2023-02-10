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
};
let dataTreeJS1 = {
    "statement": "statementA",
    "question": "question0 what would you like to schedule?",
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
};
let dataTreeJS2 = {
    "statement": "Cannot set property '0' of undefined : trees[0] = new Tree(dataTreeJS0)",
    "question": "try using push?",
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
};
let dataTreeJS3 = {
    "statement": "Cannot set property '0' of undefined : trees[0] = new Tree(dataTreeJS0)",
    "question": "try using push?",
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
        it('DEBUG should add one SOLO children to queue for breadth first search', () => {
            let queue = trees.first().addChildrenToQueue(trees[1]); // queue for breadth first search
            expect(queue.length).toBe(1);
        });
        it('should add children Array to queue for breadth first search', () => {
            let queue = trees.first().addChildrenToQueue([trees[2]]); // queue for breadth first search
            expect(queue.length).toBe(1);
        });
        it('should add two children to queue for breadth first search', () => {
            trees[0].addChildrenToQueue([trees[1]]);
            let queue = trees.first().addChildrenToQueue([trees[2]]); // queue for breadth first search
            expect(queue.length).toBe(2);
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
    it("DEBUG should search zero level", () => {
        const tree = new Tree(dataTreeJS);
        let search = tree.getChildren()
        expect(search).toMatch('')
    });
    */
});
