import SchemaFile from "../SchemaFile.js";
import path from "path";
import Schema from "../Schema.js";

describe('App', () => {
    it('DEBUG should read file, clean and then output new file', () => {

        // object_4 is duplicated in the schema file
        let schemaFilenameInput = path.join(__dirname, "../schema/mock_application.json");
        let schemaFile = new SchemaFile(schemaFilenameInput);
        let schemaObj = schemaFile.schemaDataObj;
        let cleanFilenameOutput1 = "schemaOutput/clean_application.integration.test.1.json";

        let schema = new Schema(schemaObj);

        let objectsWithDups = schemaFile.objectsFromSchema();
        let dupsRemovedObjects = schema.uniqueArrayOfObjects(objectsWithDups);

        schemaFile.setObjects(dupsRemovedObjects);
        schemaFile.writeOutputFile(cleanFilenameOutput1);

        // ensure no duplicates by counting number of objects
        let fileCleanOutput = new SchemaFile(cleanFilenameOutput1);
        let outputFileObj : any = fileCleanOutput.read();
        expect(fileCleanOutput.objectsFromSchema().length).toEqual(5); // remove 1 duplicated object

        let objectIndex = 0;
        outputFileObj.versions[0].objects.forEach((object:any) => {
            schemaFile.setFields(objectIndex, schema.uniqueArrayOfObjects(object.fields))
            objectIndex++;
        });

        schemaFile.schemaDataObj = schemaObj;
        schemaFile.writeOutputFile("schemaOutput/clean_application.test.2.json");

        let finalFile : any = new SchemaFile("schemaOutput/clean_application.test.2.json");
        expect(finalFile.fieldsFromSchema(0).length).toBe(6);

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