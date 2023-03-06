import SchemaFile from "../SchemaFile.js";
import path from "path";
import Schema from "../Schema.js";

describe('App', () => {
    it('DEBUG should read file, clean and then output new file', () => {

        // object_4 is duplicated in file, six total
        let schemaFilename = path.join(__dirname, "../schema/mock_application.json");
        let schemaFile = new SchemaFile(schemaFilename);
        let schemaObj = schemaFile.schemaDataObj;

        let schema = new Schema(schemaObj);

        let objectsWithDups = schemaFile.objectsFromSchema();
        let dupsRemovedObjects = schema.uniqueArrayOfObjects(objectsWithDups);

        schemaFile.setObjects(dupsRemovedObjects);
        schemaFile.writeOutputFile("schemaOutput/clean_application.test.1.json");

        // ensure no duplicates by counting number of objects
        let fileCleanOutput = new SchemaFile("schemaOutput/clean_application.test.1.json");
        let outputFileObj : any = fileCleanOutput.read();
        expect(outputFileObj.versions[0].objects.length).toEqual(5); // remove 1 duplicated object
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