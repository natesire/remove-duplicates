const readline = require("readline");
const mongoose = require("mongoose");
import * as fs from 'fs';
import { NodeTree } from './types';

export class Question {
    public tree;
    private treeFilename;

    constructor(treeFilename?: string) {
        this.tree = 1;
        this.treeFilename = treeFilename;
    }

    loadTree() {
        // load tree from file
        this.tree = JSON.parse(fs.readFileSync(this.treeFilename, 'utf8'));
    }

    search() {

    }

    getTree() {
        //return questionsAnswersTree;
        return { test: 'test' }
    }

}
 
class FileManager {
    writeObjToFile(obj: Node, fileName: string) {
        fs.writeFile('tree.txt', JSON.stringify(obj), function (err) {
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

let questionsAnswersTree : NodeTree = {
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

let myShift = function(queue : Array<Node>) : Array<Node> {
    queue.shift();
    return queue;
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
let breadthFirstSearch = function(userInput: string, startTree: Node) : Node {
    let foundNode : Node = startTree;
    let queue : Array<Node> = [foundNode]; // one level of the tree
    //let nextNode = 1;
    //queue.push({});

    while(queue.length > 0) {
        //node = myShift; // what if on last in queue?
        if(fuzzyMatch(userInput, foundNode.question) === 1) { // 100% match
            console.log('found node: ' + foundNode.question);
            foundNode = foundNode;
        }
    }
    return foundNode;
}

let searchForQuestionNode = function(search: string, currentNode: Node) : Node {
    let yesNode : Node = currentNode['yes'] || currentNode; // yes or no
    let noNode : Node = currentNode['no'] || currentNode; // yes or no
    if(fuzzyMatch(search, yesNode.question) === 1) { // 100% match
        console.log('found node: ' + yesNode.question);
        return yesNode;
    } else if(fuzzyMatch(search, noNode.question) === 1) { // 100% match
        console.log('found node: ' + noNode.question);
        return noNode;
    }
    return currentNode;
}

var nextNode = function (currentNode: Node, userInput: string) : Node {
    return currentNode[userInput] as Node;
}

function waitForUserInput(nodeTree?: Node) {
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
                waitForUserInput(nodeTree[userInput]);
            }

            let nextNode: Node = searchForQuestionNode(userInput, questionsAnswersTree);
            waitForUserInput(nextNode);
        });
    }
}

waitForUserInput(questionsAnswersTree);

commandLine.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});

let writer = new FileManager();
writer.writeObjToFile(questionsAnswersTree, 'tree.txt');

