import fs from "fs";
import Schema from "../Schema.js";
import path from "path";

describe("Class Schema", () => {
  let schemaFilename: string;
  let schemaInstance: Schema;
  let schemaContentFromFile: string;

  beforeAll(() => {
    schemaFilename = path.join(__dirname, 'mock.json');
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
    expect(schemaInstance.getSchema('versions')).toBeTruthy();
  });

  describe('standard NodeJS behavior', () => {
    describe('JSON', () => {
      it("parse should remove duplicate key", () => {
        let schemaObj = JSON.parse(schemaContentFromFile);
        expect(Object.entries(schemaObj).length).toBe(2);
      });

      it("should remove first duplicate key 'versions'", () => {
        let schemaObj = JSON.parse(schemaContentFromFile);
        expect(Object.entries(schemaObj['versions']).length).toBe(1);
      });
    });
  });
});
