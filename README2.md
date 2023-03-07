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