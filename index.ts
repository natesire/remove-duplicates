const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var waitForUserInput = function(questionSearch?: string) {

    //search mongoDB for question

    rl.question("Question: ", function(question: string) {
      if (question == "exit"){
          rl.close();
      } else {
          waitForUserInput();
      }
    });
  }

    waitForUserInput();

rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});