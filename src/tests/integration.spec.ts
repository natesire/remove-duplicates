import SchemaFile from "../SchemaFile.js";
import path from "path";
import Schema from "../Schema.js";

describe('App', () => {
    it('should read file, clean and then output new file', () => {

        let schemaFilename = path.join(__dirname, "mock.json");
        let schemaFile = new SchemaFile(schemaFilename);
        let schemaObj = schemaFile.schemaDataObj;

        let schema = new Schema(schemaObj);

        let objectsWithDups = schemaFile.objectsFromSchema();
        let dupsRemovedObjects = schema.uniqueArrayOfObjects(objectsWithDups);

        schemaFile.setObjects(dupsRemovedObjects);
        schemaFile.writeOutputFile();

        // ensure no duplicates by counting number of objects
        let fileCleanOutput = new SchemaFile("schemaOutput/clean_application.test.json");
        let outputFileObj : any = fileCleanOutput.read();
        expect(outputFileObj.versions[0].objects.length).toEqual(2);
    });

    it('should read file and remove duplicate objects', () => {

        let schemaFilename = path.join(__dirname, "mock.json");
        let schemaFile = new SchemaFile(schemaFilename);
        let schemaObj = schemaFile.schemaDataObj;

        let schema = new Schema(schemaObj);

        let objectsWithDups = schemaFile.objectsFromSchema();
        let dupsRemovedObjects = schema.uniqueArrayOfObjects(objectsWithDups);

        expect(dupsRemovedObjects.length).toEqual(2);
    });

    it('should read file and remove duplicate objects and set clean objects', () => {

        let schemaFilename = path.join(__dirname, "mock.json");
        let schemaFile = new SchemaFile(schemaFilename);
        let schemaObj = schemaFile.schemaDataObj;

        let schema = new Schema(schemaObj);

        let objectsWithDups = schemaFile.objectsFromSchema();
        let dupsRemovedObjects = schema.uniqueArrayOfObjects(objectsWithDups);

        schemaFile.setObjects(dupsRemovedObjects);

        expect(schemaFile.objectsFromSchema().length).toEqual(2);
    });
});