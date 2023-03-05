import fs from "fs";
import Schema from "../Schema.js";
import path from "path";

describe("Class Schema", () => {
  let schemaFilename: string;
  let cleanTestSchemaFilename: string;
  let schemaInstance: Schema;
  let schemaContentFromFile: string;
  let schemaObj;
  let objectsFromSchema: any;

  describe("mock_application.versions.json", () => {
    beforeAll(() => {
      schemaFilename = path.join(__dirname, "mock_application.versions.json");
      cleanTestSchemaFilename = path.join(__dirname, "clean_test_application.json");
      schemaContentFromFile = fs.readFileSync(schemaFilename, "utf8");
    });

    it("should return a schema instance", () => {
      schemaInstance = new Schema(schemaContentFromFile);
      expect(schemaInstance).toBeDefined();
    });
  });

  describe("mock.json", () => {
    beforeAll(() => {
      schemaFilename = path.join(__dirname, "mock.json");
      schemaContentFromFile = fs.readFileSync(schemaFilename, "utf8");
      schemaObj = JSON.parse(schemaContentFromFile);
      objectsFromSchema = schemaObj.versions[0].objects;
    });

    it("should instantiate Schema", () => {
      let schemaObj = JSON.parse(schemaContentFromFile);
      schemaInstance = new Schema(schemaObj);
      expect(schemaInstance).toBeTruthy();
    });

    it("should parse JSON from file", () => {
      expect(JSON.parse(schemaContentFromFile)).toBeTruthy();
    });

    it("should get schema", () => {
      let schemaObj = JSON.parse(schemaContentFromFile);
      schemaInstance = new Schema(schemaObj);
      expect(schemaInstance.getSchema()).toBeTruthy();
    });

    it("should get schema", () => {
      let schemaObj = JSON.parse(schemaContentFromFile);
      schemaInstance = new Schema(schemaObj);
      expect(schemaInstance.getSchema()).toBeTruthy();
    });

    it("should get schema item by key", () => {
      let schemaObj = JSON.parse(schemaContentFromFile);
      schemaInstance = new Schema(schemaObj);
      expect(schemaInstance.getSchema("versions")).toBeTruthy();
    });

    describe("standard NodeJS behavior", () => {
      describe("JSON", () => {
        it("parse should remove duplicate JSON object by key", () => {
          let schemaObj = JSON.parse(schemaContentFromFile);
          expect(Object.entries(schemaObj).length).toBe(1);
        });

        it("should return last duplicate JSON object according to IEEE", () => {
          let schemaObj = JSON.parse(schemaContentFromFile);
          expect(Object.entries(schemaObj["versions"][0]["thirdKey"])).toEqual([
            ["test", "test"],
          ]);
        });
      });
    });

    it("should find key for duplicate object", () => {
      let schemaObj = JSON.parse(schemaContentFromFile);
      let lastObj = schemaObj["versions"][0]["objects"];
      expect(lastObj[0]).toEqual({ key: "object_1" });
    });

    // ensures the other tests has duplicate objects to test against
    it("should find duplicate keys inside objects from JSON", () => {
      let schemaObj = JSON.parse(schemaContentFromFile);
      let objectsWithDups = Object.entries(schemaObj["versions"][0]["objects"]);
      expect(objectsWithDups.length).toEqual(3);
    });

    it("should receive schema data with correct shape", () => {
      let schemaObj = JSON.parse(schemaContentFromFile);
      let lastObj = schemaObj["versions"][0]["objects"];
      let schema = new Schema(lastObj);

      expect(schema.schemaData[0]['key']).toMatch(/object/);
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

    it("should create unique array of objects", () => {
      let uniqueSet = new Set();
      let actualItem;
      let uniqueArrayOfObjects = Array<object>();
      let literal = [{ key: 1 }, { key: 1 }, { key: 2 }];

      Object.entries(literal).forEach((item) => {
        actualItem = item[1];
        if(!uniqueSet.has(actualItem.key)) {
          uniqueArrayOfObjects.push(actualItem);
        }
        uniqueSet.add(actualItem.key); // value (key) is at index 0
      });
      fs.writeFileSync(cleanTestSchemaFilename, JSON.stringify(uniqueArrayOfObjects));
      expect(uniqueArrayOfObjects.length).toEqual(2);
    });

    it("should write JSON unique array of objects", () => {
      let uniqueSet = new Set();
      let actualItem;
      let uniqueArrayOfObjects = Array<object>();
      let literal = [{ key: 1 }, { key: 1 }, { key: 2 }];

      Object.entries(literal).forEach((item) => {
        actualItem = item[1];
        if(!uniqueSet.has(actualItem.key)) {
          uniqueArrayOfObjects.push(actualItem);
        }
        uniqueSet.add(actualItem.key); // value (key) is at index 0
      });
      fs.writeFileSync(cleanTestSchemaFilename, JSON.stringify(uniqueArrayOfObjects));
      expect(fs.readFileSync(cleanTestSchemaFilename).toString()).toEqual(JSON.stringify(uniqueArrayOfObjects));
    });

    it("should write JSON unique array of objects with iterator", () => {
      let uniqueSet = new Set();
      let uniqueArrayOfObjects = Array<object>();
      let arrayOfObjects = [{ key: 1 }, { key: 1 }, { key: 2 }];

      arrayOfObjects.forEach((item) => {
        if(!uniqueSet.has(item.key)) {
          uniqueArrayOfObjects.push(item);
        }
        uniqueSet.add(item.key);
      });
      fs.writeFileSync(cleanTestSchemaFilename, JSON.stringify(uniqueArrayOfObjects));
      expect(fs.readFileSync(cleanTestSchemaFilename).toString()).toEqual(JSON.stringify(uniqueArrayOfObjects));
    });

    it('should return unique array of objects', () => {
      schemaInstance = new Schema(schemaContentFromFile);
      let literal = [{ key: 1 }, { key: 1 }, { key: 2 }];
      let unique = schemaInstance.uniqueArrayOfObjects(literal);
      expect(unique.length).toEqual(2);
    });

    it('should return unique array of objects retreived from schema', () => {
      schemaInstance = new Schema(objectsFromSchema);
      let unique = schemaInstance.uniqueArrayOfObjects(objectsFromSchema);
      expect(unique.length).toEqual(2);
    });
  });
});
