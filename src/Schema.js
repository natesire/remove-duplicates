"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Schema {
    // Schema doesn't know anything about files. It expects an Object.
    constructor(schema) {
        //if(!!schema) { throw new Error('Schema is Falsy'); }
        console.log(schema);
        this.schemaData = schema;
        this.versions = this.schemaData.versions;
        this.objectsFromSchema = this.versions?.objects;
    }
    cleanedSubSchema(schemaFile) {
        return [];
    }
    getSchema(key) {
        if (key)
            return this.schemaData[key];
        return this.schemaData;
    }
    // arrayOfObjects should have shape: [{ key: 1 }, { key: 1 }, { key: 2 }] from the schema file
    uniqueArrayOfObjects(arrayOfObjects) {
        let uniqueArrayOfObjects = Array();
        let uniqueSetOfKeys = new Set();
        arrayOfObjects.forEach((objectInJSONSchema) => {
            if (!uniqueSetOfKeys.has(objectInJSONSchema.key))
                uniqueArrayOfObjects.push(objectInJSONSchema);
            uniqueSetOfKeys.add(objectInJSONSchema.key);
        });
        return uniqueArrayOfObjects;
    }
}
exports.default = Schema;
