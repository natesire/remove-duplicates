"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Schema {
    // Schema doesn't know anything about files. It expects an Object.
    constructor(schemaObj) {
        //if(!!schema) { throw new Error('Schema is Falsy'); }
        this.schemaData = schemaObj;
        //this.versions = this.schemaData.versions;
        //this.objectsFromSchema = this.versions?.objects;
    }
    cleanedSubSchema(schemaFile) {
        return [];
    }
    // arrayOfObjects should have shape: [{ key: 1 }, { key: 1 }, { key: 2 }] from the schema file
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
