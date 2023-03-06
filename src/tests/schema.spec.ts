import Schema from "../Schema.js";
import path from "path";
import SchemaFile from "../SchemaFile.js";

describe("#Schema", () => {
  let schemaFilename: string;
  let schemaInstance: Schema;
  let schemaContentFromFile: string;
  let schemaObj;
  let objectsFromSchema: any;
  let schemaFile: SchemaFile;

  beforeAll(() => {
    schemaFilename = path.join(__dirname, "mock.json");
    schemaFile = new SchemaFile(schemaFilename);
    objectsFromSchema = schemaFile.objectsFromSchema();
  });

  it("should find duplicate keys inside object", () => {
    let literal2: Array<any> = [];
    let literal = [{ key: 1 }, { key: 2 }];
    literal.map((item) => {
      literal2.push(item);
    });
    expect(literal2.length).toEqual(2);
  });

  it("should create unique map", () => {
    let uniqueObjects = new Map();
    let literal = [{ key: 1 }, { key: 1 }];
    literal.map((item) => {
      uniqueObjects.set(item.key, item);
    });
    expect(uniqueObjects.size).toEqual(1);
  });

  it("should return unique array of objects", () => {
    schemaInstance = new Schema(schemaFile.schemaDataObj);
    let literal = [{ key: 1 }, { key: 1 }, { key: 2 }];
    let unique = schemaInstance.uniqueArrayOfObjects(literal);
    unique;
    expect(unique.length).toEqual(2);
  });

  it("should return unique array of objects retreived from schema", () => {
    let schema = new Schema(schemaFile.schemaDataObj);
    let objects = schemaFile.objectsFromSchema();
    let unique = schema.uniqueArrayOfObjects(objects);
    expect(unique.length).toEqual(2);
  });

  describe("fields", () => {
    it("should find seven fields since field_4 is duplicated", () => {
      schemaFilename = path.join(__dirname, "../schema/mock_application.json");
      schemaFile = new SchemaFile(schemaFilename);
      let fieldsFirstObject = schemaFile.objectsFromSchema()[0];
      expect(fieldsFirstObject.fields.length).toEqual(7);
    });

    it("should remove the one duplicate of field_4", () => {
      schemaFilename = path.join(__dirname, "../schema/mock_application.json");
      schemaFile = new SchemaFile(schemaFilename);
      let schema = new Schema(schemaFile.schemaDataObj);

      let uniqueFields = schema.uniqueArrayOfObjects(schemaFile.objectsFromSchema()[0].fields);

      expect(uniqueFields.length).toEqual(6);
    });
  });
});
