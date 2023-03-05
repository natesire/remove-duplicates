import fs from "fs";
import Schema from "../Schema.js";
import path from "path";

describe("Class Schema", () => {
  let schemaFilename: string;
  let schemaInstance: Schema;
  let schemaContentFromFile: string;

  describe("mock_application.versions.json", () => {
    beforeAll(() => {
      schemaFilename = path.join(__dirname, "mock_application.versions.json");
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
      expect(lastObj[0]).toEqual({ key: "object_3" });
    });

    it("should find duplicate keys inside object", () => {
      let schemaObj = JSON.parse(schemaContentFromFile);
      let lastObj = schemaObj["versions"][0]["objects"];
      expect(Object.entries(lastObj).length).toEqual(2);
    });

    it("should find duplicate keys inside object", () => {
      let schemaObj = JSON.parse(schemaContentFromFile);
      let lastObj = schemaObj["versions"][0]["objects"];
      let schema = new Schema(lastObj);

      expect(schema).toEqual({
        schemaData: [{ key: "object_3" }, { key: "object_3" }],
      });
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
      expect(uniqueArrayOfObjects.length).toEqual(2);
    });

    /*
  it('should find duplicate keys inside object', () => {
      let schemaObj = JSON.parse(schemaContentFromFile);
      let lastObj = schemaObj['versions'][0]['objects'];
      let schema = new Schema(lastObj);
      schema.removeDuplicates();

      expect(schema.schemaData).toEqual({"schemaData": [{"key": "object_3"}, {"key": "object_3"}]});
  });
*/
  });
});
