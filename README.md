# Solution

The unit tests show the solution working. There is an integration test that runs all the steps. I used a JS Set to uniquely identify each field and object.

# Run the app tests

npm run tests
# Clarification

Objects could mean any JSON object or the actual key named "objects" in the JSON schema.

# Policy for Removing Duplicates

IEEE keeps the last key/value pair based on order. There's no timestamp in the data to create a more robust policy.

# Architecture

The algorithm to normalize clean the schema is n^2 worse case. Fields are a loop inside of Objects loop. Loop inside a loop. It also depends on how much data schema we are working with. n fields and n objects. I would recommend the cleaner be run async off the monolith. An async node worker pool can be setup to alert the frontend when it is done.

# Ultimate Solution

Identify how to keep duplicates from being entered in the first place.

# Alternative Solution

Instead of using a pre-existing npm package, we can build our own package that can normalize any JSON schema. The first step is to build a findKey method that allows the code to be easily applied to any schema. Branch DFS is the start of this. It removed one less dependency and and can be cuztomized into the architecture.

# ORIGINAL Instructions


## Remove Duplicates From Mock Knack Application Schema

Knack is a no-code platform that includes an online database. Knack users will at times, through unexpected API usage or an unknown bug, corrupt their application schemas. One common issue they may run into is having duplicate fields and/or objects in their application schema. These duplicates cannot be removed by the Knack UI and lead to TypeErrors and other problems.

The purpose of this coding exercise is to create a Node.js application that can programmatically remove all duplicate fields and objects from the given mock application schema and output a new sanitized version.

The "mock_application.json" file in this repository contains data which represents an actual Knack application schema including all currently existing properties. Your code should process the data, remove any duplicates, and output a new JSON file "clean_application.json" which retains all other properties of the Knack application.

Within a standard Knack application there is a `versions` property which has 2 collections:
1. `objects`: an array of Knack "objects" which contains "fields"
2. `scenes`: an array of Knack "scenes" which contains "views"

### Requirements
- The code should be written in JS and utilize the Node.js framework
- We expect tests (unit tests on business logic, etc. - whatever you are comfortable with)
- We expect to see documentation in the form of a README
- We're looking for code that would be easy to maintain
- We're looking for code that would scale

### Time
We understand that you are busy and programming projects can take a long time. We advise spending 2 hours on the exercise and seeing where you get. If there are still open requirements at the end of the 2 hour period, feel free to outline what it would take to complete those in TODO comments inline in the code, or a list of notes on what you'd need to do finish things up. If you want to keep working and take things over the finish line, great.

### Notes
- Leveraging 3rd party libraries/modules is perfectly fine

### How to submit your solution
- Please send us a zip or a tar of the `node-coding-exercise-master` directory which should include your application
