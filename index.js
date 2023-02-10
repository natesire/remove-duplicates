"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const mongoose = require("mongoose");
const FileManager_1 = __importDefault(require("./FileManager"));
const Tree_1 = __importDefault(require("./Tree"));
const commandLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let dataTreeLiteral = {
    "statement": "statement0",
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
let myShift = function (queue) {
    queue.shift();
    return queue;
};
let fuzzyMatch = function (userInput, tree) {
    if (!tree)
        return 0;
    let count = 0;
    let str = 'This expression is not callable';
    let queue = str.split('');
    // for each string in userInput, match in tree node
    userInput.split(' ').forEach(function (word) {
        if (queue.includes(word)) {
            count++;
        }
    });
    return count;
};
// x nodes per y level 1, 2, 4, 8
// lets start from root node
let breadthFirstSearch = function (userInput, startTree) {
    let firstTreeNode = startTree;
    let queue = [firstTreeNode]; // one level of the tree
    //let nextNode = 1;
    //queue.push({});
    while (queue.length > 0) {
        //node = myShift; // what if on last in queue?
        if (fuzzyMatch(userInput, firstTreeNode.question) === 1) { // 100% match
            console.log('found node: ' + firstTreeNode.question);
            firstTreeNode = firstTreeNode;
        }
    }
    return firstTreeNode;
};
/*
let searchForQuestionNode = function(search: string, tree: Tree | TreeLiteral) : Tree {
    let child = tree['children'];
    if(fuzzyMatch(search, child.question) === 1) { // 100% match
        console.log('found node: ' + child.question);
        return child as Tree;
    } else if(fuzzyMatch(search, child.question) === 1) { // 100% match
        console.log('found node: ' + child.question);
        return child as Tree;
    }
    return tree as unknown as Tree;
}*/
var nextNode = function (currentNode, userInput) {
    //return currentNode[userInput] as NodeTree;
    return currentNode;
};
function waitForCommandLine(tree) {
    if (tree === undefined) {
        console.log('currentNode is undefined');
        commandLine.close();
    }
    else {
        let question = tree.question;
        console.log(question);
        commandLine.question("User Response: ", function (userInput) {
            if (userInput == "exit") {
                commandLine.close();
            }
            // sentiment analysis
            if (userInput.match(/y/i) || userInput.match(/n/i)) {
                let key = "yay";
                waitForCommandLine(tree[key]);
            }
            //let nextNode : Tree = searchForQuestionNode(userInput, tree);
            let nextNode = tree;
            waitForCommandLine(nextNode);
        });
    }
}
waitForCommandLine(dataTreeLiteral);
commandLine.on("close", function () {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});
let tree = new Tree_1.default(dataTreeLiteral);
let file = new FileManager_1.default('js.tree.json');
file.writeToFile(tree.toString());
