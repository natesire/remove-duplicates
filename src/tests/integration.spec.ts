import SchemaFile from "../SchemaFile.js";
import path from "path";
import Schema from "../Schema.js";

describe('App', () => {
    it('should read file, clean and then output new file', () => {

        let schemaFilename = path.join(__dirname, "mock.json");
        let schemaFile = new SchemaFile(schemaFilename);
        let schemaObj = schemaFile.schema;

        let schema = new Schema(schemaObj);

        let objectsWithDups = schemaFile.objectsFromSchema();
        let dupsRemovedObjects = schema.uniqueArrayOfObjects(objectsWithDups);

        schemaFile.setObjects(dupsRemovedObjects);
        schemaFile.writeFile();

    });
});