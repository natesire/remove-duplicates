const readline = require("readline");
const mongoose = require("mongoose");
import * as fs from 'fs';
import { NodeTree } from './types';

export class Question {
    public tree : NodeTree;
    private treeFilename;

    constructor(treeFilename?: string) {
        this.tree = { statement: 'test', question: '' };
        this.treeFilename = treeFilename;
    }

    loadTree() {
        // load tree from file
        this.tree = JSON.parse(fs.readFileSync('js.tree.json', 'utf8'));
    }

    search() {

    }

    getTree() {
        //return questionsAnswersTree;
        return { test: 'test' }
    }

}
 
class FileManager {
    writeStringToFile(str: string, fileName: string) {
        fs.writeFile('tree.txt', JSON.stringify(str), function (err) {
            if (err) return console.log(err);
            //console.log('file written');
        });
    }
}

const commandLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let rootQuestion : string = '';

let dataTree : NodeTree = {
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

let myShift = function(queue : Array<NodeTree>) : Array<NodeTree> {
    queue.shift();
    return queue as Array<NodeTree>;
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
let breadthFirstSearch = function(userInput: string, startTree: NodeTree) : NodeTree {
    let foundNode : NodeTree = startTree;
    let queue : Array<NodeTree> = [foundNode]; // one level of the tree
    //let nextNode = 1;
    //queue.push({});

    while(queue.length > 0) {
        //node = myShift; // what if on last in queue?
        if(fuzzyMatch(userInput, foundNode.question) === 1) { // 100% match
            console.log('found node: ' + foundNode.question);
            foundNode = foundNode;
        }
    }
    return foundNode as NodeTree;
}

let searchForQuestionNode = function(search: string, currentNode: NodeTree) : NodeTree {
    let yesNode : NodeTree = currentNode['yes'] || currentNode; // yes or no
    let noNode : NodeTree = currentNode['no'] || currentNode; // yes or no
    if(fuzzyMatch(search, yesNode.question) === 1) { // 100% match
        console.log('found node: ' + yesNode.question);
        return yesNode;
    } else if(fuzzyMatch(search, noNode.question) === 1) { // 100% match
        console.log('found node: ' + noNode.question);
        return noNode;
    }
    return currentNode;
}

var nextNode = function (currentNode: NodeTree, userInput: string) : NodeTree {
    //return currentNode[userInput] as NodeTree;
    return currentNode;
}

function waitForCommandLine(nodeTree?: NodeTree) {
    if (nodeTree === undefined) {
        console.log('currentNode is undefined');
        commandLine.close();
    } else {
        let question: string = nodeTree.question;
        console.log(question);

        commandLine.question("User Response: ", function (userInput: string) {

            if (userInput == "exit") {
                commandLine.close();
            }

            if (userInput === 'yes' || userInput === 'no') {
                waitForCommandLine(nodeTree[userInput]);
            }

            let nextNode : NodeTree = searchForQuestionNode(userInput, dataTree);
            waitForCommandLine(nextNode);
        });
    }
}

waitForCommandLine(dataTree);

commandLine.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});

let writer = new FileManager();
writer.writeStringToFile(JSON.stringify(dataTree), 'tree.txt');

