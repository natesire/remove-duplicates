"use strict";
exports.__esModule = true;
var readline = require("node:readline");
var node_process_1 = require("node:process");
var rl = readline.createInterface({ input: node_process_1.stdin, output: node_process_1.stdout });
var answer = rl.question('What do you think of Node.js? ', function (answer) {
    console.log("Thank you for your valuable feedback: ".concat(answer));
});
rl.close();
