import fs from "fs";
import path from "path";
import SchemaFile from "../SchemaFile.js";

let schemaFilename: string;
let cleanTestSchemaFilename: string;
let schemaContentFromFile: string;

describe("SchemaFile", () => {
  beforeAll(() => {
    schemaFilename = path.join(__dirname, "mock.json");
    cleanTestSchemaFilename = path.join(__dirname, "../../schemaOutput/clean_application.test.json");
    schemaContentFromFile = fs.readFileSync(schemaFilename, "utf8");
  });

  describe("findKey", () => {
    it("should return first key found", () => {
      let schemaFile = new SchemaFile(schemaFilename);
      expect(schemaFile.findKeyInSchema("versions")).toBeTruthy();
    });
  });

  it("should write to output file", () => {
    let schemaFile = new SchemaFile(schemaFilename);
    schemaFile.writeOutputFile();
  });

  it("should receive schema data with correct shape", () => {
    let schemaFile = new SchemaFile(schemaFilename);
    let schemaData = schemaFile.schemaDataObj;
    let lastObj = schemaData["versions"][0]["objects"];

    expect(schemaData["versions"][0]["objects"][0].key).toMatch(/object/);
  });

  it("should find key for duplicate object", () => {
    let schemaFile = new SchemaFile(schemaFilename);
    let schemaObj = schemaFile.schemaDataObj;
    let lastObj = schemaObj["versions"][0]["objects"];
    expect(lastObj[0]).toEqual({ key: "object_1" });
  });

  it("should create unique array of objects", () => {
    let uniqueSet = new Set();
    let actualItem;
    let uniqueArrayOfObjects = Array<object>();
    let literal = [{ key: 1 }, { key: 1 }, { key: 2 }];

    Object.entries(literal).forEach((item) => {
      actualItem = item[1];
      if (!uniqueSet.has(actualItem.key)) {
        uniqueArrayOfObjects.push(actualItem);
      }
      uniqueSet.add(actualItem.key); // value (key) is at index 0
    });
    /*fs.writeFileSync(
      cleanTestSchemaFilename,
      JSON.stringify(uniqueArrayOfObjects)
    );*/
    expect(uniqueArrayOfObjects.length).toEqual(2);
  });

  it("should write JSON unique array of objects", () => {
    let uniqueSet = new Set();
    let actualItem;
    let uniqueArrayOfObjects = Array<object>();
    let literal = [{ key: 1 }, { key: 1 }, { key: 2 }];

    Object.entries(literal).forEach((item) => {
      actualItem = item[1];
      if (!uniqueSet.has(actualItem.key)) {
        uniqueArrayOfObjects.push(actualItem);
      }
      uniqueSet.add(actualItem.key); // value (key) is at index 0
    });
    fs.writeFileSync(
      cleanTestSchemaFilename,
      JSON.stringify(uniqueArrayOfObjects)
    );
    expect(fs.readFileSync(cleanTestSchemaFilename).toString()).toEqual(
      JSON.stringify(uniqueArrayOfObjects)
    );
  });

  it("should write JSON unique array of objects with iterator", () => {
    let uniqueSet = new Set();
    let uniqueArrayOfObjects = Array<object>();
    let arrayOfObjects = [{ key: 1 }, { key: 1 }, { key: 2 }];

    arrayOfObjects.forEach((item) => {
      if (!uniqueSet.has(item.key)) {
        uniqueArrayOfObjects.push(item);
      }
      uniqueSet.add(item.key);
    });
    fs.writeFileSync(
      cleanTestSchemaFilename,
      JSON.stringify(uniqueArrayOfObjects)
    );
    expect(fs.readFileSync(cleanTestSchemaFilename).toString()).toEqual(
      JSON.stringify(uniqueArrayOfObjects)
    );
  });

  it("should remove duplicate field by key", () => {
    let schemaNormalized = JSON.parse(fs.readFileSync(schemaFilename, "utf8"));
    fs.writeFileSync(
      "src/clean_application.json",
      JSON.stringify(schemaNormalized, null, 2)
    );
  });

  it("should have tests in path", () => {
    expect(__dirname).toContain("tests");
  });

  it("writes the clean file", () => {
    let test = "test";
    // write to file
    fs.writeFileSync("clean.output.json", test);
    expect(fs.existsSync("clean.output.json")).toBe(true);
  });

  it("writes the clean file", () => {
    let test = "test";
    // write to file
    fs.writeFileSync("clean.output.json", test);
    let read = fs.readFileSync("clean.output.json", "utf8");
    expect(read).toBe(test);
  });

  // ensures the other tests has duplicate objects to test against
  it("should find duplicate keys inside objects from JSON", () => {
    let schemaObj = JSON.parse(schemaContentFromFile);
    let objectsWithDups = Object.entries(schemaObj["versions"][0]["objects"]);
    expect(objectsWithDups.length).toEqual(3);
  });
});
