const readline = require("readline");
const mongoose = require("mongoose");
import { TreeType } from './types';
import FileManager from './fileManager';
import { Tree } from './tree';

const commandLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let rootQuestion : string = '';

let dataTreeLiteral : TreeType = {
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
                "question": "imports",
            },

        "no": {
            "statement": "This expression is not callable",
            "question": "is it defined as a function?",
            },
        } 
    }
}

let myShift = function(queue : Array<Tree>) : Array<Tree> {
    queue.shift();
    return queue as Array<Tree>;
}

let fuzzyMatch = function(userInput: string, question: string) : number {
    let count = 0;
    // for each string in userInput, check if it is in question
    userInput.split(' ').forEach(function(word) {
        if(question.includes(word)) {
            count++;
        }
    });
    return count;
}

// x nodes per y level 1, 2, 4, 8
// lets start from root node
let breadthFirstSearch = function(userInput: string, startTree: Tree) : Tree {
    let firstTreeNode : Tree = startTree;
    let queue : Array<Tree> = [firstTreeNode]; // one level of the tree
    //let nextNode = 1;
    //queue.push({});

    while(queue.length > 0) {
        //node = myShift; // what if on last in queue?
        if(fuzzyMatch(userInput, firstTreeNode.question) === 1) { // 100% match
            console.log('found node: ' + firstTreeNode.question);
            firstTreeNode = firstTreeNode;
        }
    }
    return firstTreeNode as Tree;
}

let searchForQuestionNode = function(search: string, currentNode: Tree) : Tree {
    let yay = currentNode['yes'];
    let nay = currentNode['no'];
    if(fuzzyMatch(search, yay.question) === 1) { // 100% match
        console.log('found node: ' + yay.question);
        return yay as Tree;
    } else if(fuzzyMatch(search, nay.question) === 1) { // 100% match
        console.log('found node: ' + nay.question);
        return nay as Tree;
    }
    return currentNode;
}

var nextNode = function (currentNode: Tree, userInput: string) : Tree {
    //return currentNode[userInput] as NodeTree;
    return currentNode;
}

function waitForCommandLine(tree?: Tree) {
    if (tree === undefined) {
        console.log('currentNode is undefined');
        commandLine.close();
    } else {
        let question: string = tree.question;
        console.log(question);

        commandLine.question("User Response: ", function (userInput: string) {

            if (userInput == "exit") {
                commandLine.close();
            }

            if (userInput === 'yes' || userInput === 'no') {
                waitForCommandLine(tree[userInput]);
            }

            let nextNode : Tree = searchForQuestionNode(userInput, tree);
            waitForCommandLine(nextNode);
        });
    }
}

waitForCommandLine(dataTreeLiteral);

commandLine.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});

let tree = new Tree(dataTreeLiteral);
let file = new FileManager('js.tree.json');
file.writeToFile(tree.toString());

