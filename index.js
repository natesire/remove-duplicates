"use strict";
exports.__esModule = true;
exports.Question = void 0;
var readline = require("readline");
var mongoose = require("mongoose");
var fs = require("fs");
var Question = /** @class */ (function () {
    function Question(treeFilename) {
        this.tree = { statement: 'test', question: '' };
        this.treeFilename = treeFilename;
    }
    Question.prototype.loadTree = function () {
        // load tree from file
        this.tree = JSON.parse(fs.readFileSync(this.treeFilename, 'utf8'));
    };
    Question.prototype.search = function () {
    };
    Question.prototype.getTree = function () {
        //return questionsAnswersTree;
        return { test: 'test' };
    };
    return Question;
}());
exports.Question = Question;
var FileManager = /** @class */ (function () {
    function FileManager() {
    }
    FileManager.prototype.writeStringToFile = function (str, fileName) {
        fs.writeFile('tree.txt', JSON.stringify(str), function (err) {
            if (err)
                return console.log(err);
            //console.log('file written');
        });
    };
    return FileManager;
}());
var commandLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var rootQuestion = '';
var dataTree = {
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
    var foundNode = startTree;
    var queue = [foundNode]; // one level of the tree
    //let nextNode = 1;
    //queue.push({});
    while (queue.length > 0) {
        //node = myShift; // what if on last in queue?
        if (fuzzyMatch(userInput, foundNode.question) === 1) { // 100% match
            console.log('found node: ' + foundNode.question);
            foundNode = foundNode;
        }
    }
    return foundNode;
};
var searchForQuestionNode = function (search, currentNode) {
    var yesNode = currentNode['yes'] || currentNode; // yes or no
    var noNode = currentNode['no'] || currentNode; // yes or no
    if (fuzzyMatch(search, yesNode.question) === 1) { // 100% match
        console.log('found node: ' + yesNode.question);
        return yesNode;
    }
    else if (fuzzyMatch(search, noNode.question) === 1) { // 100% match
        console.log('found node: ' + noNode.question);
        return noNode;
    }
    return currentNode;
};
var nextNode = function (currentNode, userInput) {
    return currentNode[userInput];
};
function waitForCommandLine(nodeTree) {
    if (nodeTree === undefined) {
        console.log('currentNode is undefined');
        commandLine.close();
    }
    else {
        var question = nodeTree.question;
        console.log(question);
        commandLine.question("User Response: ", function (userInput) {
            if (userInput == "exit") {
                commandLine.close();
            }
            if (userInput === 'yes' || userInput === 'no') {
                waitForCommandLine(nodeTree[userInput]);
            }
            var nextNode = searchForQuestionNode(userInput, dataTree);
            waitForCommandLine(nextNode);
        });
    }
}
waitForCommandLine(dataTree);
commandLine.on("close", function () {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});
var writer = new FileManager();
writer.writeStringToFile(JSON.stringify(dataTree), 'tree.txt');
