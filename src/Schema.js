"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Schema {
    // Schema doesn't know anything about files. It expects an Object.
    constructor(schemaObj) {
        //if(!!schema) { throw new Error('Schema is Falsy'); }
        this.schemaData = schemaObj;
    }
    // can be applied to Objects or fields 
    uniqueArrayOfObjects(arrayOfObjects) {
        let uniqueArrayOfObjects = Array();
        let uniqueSetOfKeys = new Set();
        // production ready tests for specific errors
        if (arrayOfObjects === undefined)
            throw new Error('arrayOfObjects is undefined');
        if (!(typeof arrayOfObjects.forEach === 'function'))
            throw new Error('arrayOfObjects is Falsy');
        arrayOfObjects.forEach((objectInJSONSchema) => {
            if (!uniqueSetOfKeys.has(objectInJSONSchema.key))
                uniqueArrayOfObjects.push(objectInJSONSchema);
            uniqueSetOfKeys.add(objectInJSONSchema.key);
        });
        return uniqueArrayOfObjects;
    }
}
exports.default = Schema;
