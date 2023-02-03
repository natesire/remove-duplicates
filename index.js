"use strict";
exports.__esModule = true;
var readline = require("readline");
var mongoose = require("mongoose");
var fileManager_1 = require("./fileManager");
var tree_1 = require("./tree");
var commandLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var rootQuestion = '';
var dataTreeLiteral = {
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
                "question": "imports"
            },
            "no": {
                "statement": "This expression is not callable",
                "question": "is it defined as a function?"
            }
        }
    }
};
var myShift = function (queue) {
    queue.shift();
    return queue;
};
var fuzzyMatch = function (userInput, question) {
    var count = 0;
    // for each string in userInput, check if it is in question
    userInput.split(' ').forEach(function (word) {
        if (question.includes(word)) {
            count++;
        }
    });
    return count;
};
// x nodes per y level 1, 2, 4, 8
// lets start from root node
var breadthFirstSearch = function (userInput, startTree) {
    var firstTreeNode = startTree;
    var queue = [firstTreeNode]; // one level of the tree
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
var searchForQuestionNode = function (search, currentNode) {
    var yay = currentNode['yes'];
    var nay = currentNode['no'];
    if (fuzzyMatch(search, yay.question) === 1) { // 100% match
        console.log('found node: ' + yay.question);
        return yay;
    }
    else if (fuzzyMatch(search, nay.question) === 1) { // 100% match
        console.log('found node: ' + nay.question);
        return nay;
    }
    return currentNode;
};
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
        var question = tree.question;
        console.log(question);
        commandLine.question("User Response: ", function (userInput) {
            if (userInput == "exit") {
                commandLine.close();
            }
            if (userInput === 'yes' || userInput === 'no') {
                waitForCommandLine(tree[userInput]);
            }
            var nextNode = searchForQuestionNode(userInput, tree);
            waitForCommandLine(nextNode);
        });
    }
}
waitForCommandLine(dataTreeLiteral);
commandLine.on("close", function () {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});
var tree = new tree_1.Tree(dataTreeLiteral);
var file = new fileManager_1["default"]('js.tree.json');
file.writeToFile(tree.toString());
