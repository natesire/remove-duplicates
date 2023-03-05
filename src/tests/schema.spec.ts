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

  it("should setup instance with schema data", () => {
    let schemaObj = JSON.parse(schemaContentFromFile);
    schemaInstance = new Schema(schemaObj);
    expect(schemaInstance.schemaData).toBeTruthy();
  });

  it("should parse JSON from file", () => {
    expect(JSON.parse(schemaContentFromFile)).toBeTruthy();
  });

  it("should find key for duplicate object", () => {
    let schemaObj = JSON.parse(schemaContentFromFile);
    let lastObj = schemaObj["versions"][0]["objects"];
    expect(lastObj[0]).toEqual({ key: "object_1" });
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
    schemaInstance = new Schema(schemaFile.jsonParse());
    let literal = [{ key: 1 }, { key: 1 }, { key: 2 }];
    let unique = schemaInstance.uniqueArrayOfObjects(literal);
    unique;
    expect(unique.length).toEqual(2);
  });

  it("DEBUG should return unique array of objects retreived from schema", () => {
    let schema = new Schema(schemaFile.jsonParse());
    let objects = schemaFile.objectsFromSchema();
    let unique = schema.uniqueArrayOfObjects(objects);
    expect(unique.length).toEqual(2);
  });
});
