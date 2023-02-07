"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tree_1 = __importDefault(require("../Tree"));
const FileManager_1 = __importDefault(require("../FileManager"));
// in case we want to deal with code
let dataTreeJS = {
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
            tree = new Tree_1.default(dataTreeJS);
            treeRoot = tree.root;
        });
        it("should load tree from literal", () => {
            expect(treeRoot['question']).toMatch('question0');
        });
        it("should return tree data", () => {
            expect(treeRoot['statement']).toMatch('statement0');
        });
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
