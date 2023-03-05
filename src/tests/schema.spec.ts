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
    schemaInstance = new Schema(schemaFile.schema());
    let literal = [{ key: 1 }, { key: 1 }, { key: 2 }];
    let unique = schemaInstance.uniqueArrayOfObjects(literal);
    unique;
    expect(unique.length).toEqual(2);
  });

  it("DEBUG should return unique array of objects retreived from schema", () => {
    let schema = new Schema(schemaFile.schema());
    let objects = schemaFile.objectsFromSchema();
    let unique = schema.uniqueArrayOfObjects(objects);
    expect(unique.length).toEqual(2);
  });
});
