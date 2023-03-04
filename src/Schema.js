"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Schema {
    constructor(schema) {
        //if(!!schema) { throw new Error('Schema is Falsy'); }
        console.log(schema);
        this.schemaData = schema;
    }
    cleanedSubSchema(schemaFile) {
        return [];
    }
    getFieldsFromSchema() {
        let mapFields = new Map(); // will a Map automatically remove duplicate keys?
        // "versions" contains an array of 1, which has a key named "objects", which holds an array of objects, which each object has a "fields" that is an array of objects
        let fieldsArrayOfObjects = this.schemaData['versions'][0].objects[0].fields; // returns an array of objects, named "fields"
        // iterate through and map each field as unique
        Object.entries(fieldsArrayOfObjects).forEach(field => {
            // field[0] // where is this coming from ?
            let key = field[1]['key'];
            let value = field[1];
            mapFields.set(key, value);
        });
        return mapFields;
    }
}
exports.default = Schema;
