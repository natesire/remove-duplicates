const readline = require("readline");
const mongoose = require("mongoose");
import fs from 'fs';


const commandLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let rootQuestion : string = '';

interface Node {
    question: string,
    yes?: Node,
    no?: Node
}

let questionsAnswersTree : Node = {
    "question": "question",
    "yes": {
        "question": "javascript",
        "yes": {
            "question": "imports",
            "yes": {
            "question": "imports",
        },
        "no": {
            "question": "browser",
            },
        },
        "no": {
            "question": "bottom",
        },
    },
    "no": {
        "question": "typescript",
        "yes": {
            "question": "types",
        },
        "no": {
            "question": "transpile",
        },
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

// optional question since recursive called
var waitForUserInput = function(question: string, currentNode: Node, i) {
    console.log(question);
    
    commandLine.question("User Response: ", function(userInput: string) { // this actually gets the user input

        if (userInput == "exit") {
          commandLine.close();
        }

        // search for best node, Breadth First Search, if first input
        // breadthFirstSearch(userInput, questionsAnswersTree);
        if(i === 0) {
            let nextNode : Node = searchForQuestionNode(userInput, questionsAnswersTree);
            let question = nextNode.question;
            waitForUserInput(question, nextNode, i++);
        }

        if(userInput === 'yes') {
            let nextNode : Node = currentNode['yes'] || currentNode; // yes or no
            let question = nextNode.question;
            waitForUserInput(question, nextNode, i++);
        } else if(userInput === 'no') {
            let nextNode : Node = currentNode['no'] || currentNode; // yes or no
            let question = nextNode.question;
            waitForUserInput(question, nextNode, i++);
        }
        
    });
  }

waitForUserInput('What are you searching for?', questionsAnswersTree, 0);

commandLine.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});

// convert to string
// flatten object to string

let tree = String(questionsAnswersTree);

fs.writeFile('tree.txt', tree, function (err) {
    if (err) return console.log(err);
    //console.log('Questions and Answers in tree written to tree.txt');
});

