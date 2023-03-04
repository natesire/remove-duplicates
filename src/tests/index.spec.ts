import fs from "fs";
import Schema from "../Schema.js";

describe("Schema", () => {
  let schemaFilenameWithPath: string;
  let schemaInstance: Schema;
  let schemaContent: string;

  let schemaObj = {
    test: "test",
  };

  beforeAll(() => {
    schemaFilenameWithPath = "mock.json";
    schemaContent = fs.readFileSync(schemaFilenameWithPath, "utf8");
  });

  it("should receive an object", () => {
    let schemaObj = JSON.parse(schemaContent);

    schemaInstance = new Schema(schemaObj);
    expect(schemaInstance).toBeTruthy();
  });

  it("should stringify schema as a string", () => {
    let str = JSON.stringify(schemaObj);
    expect(str).toMatch("test");
  });

  it("should find content", () => {
    expect(JSON.parse(schemaContent)).toBeTruthy();
  });

  it("should get schema", () => {
    let schemaObj = JSON.parse(schemaContent);
    schemaInstance = new Schema(schemaObj);
    expect(schemaInstance.getSchema()).toBeTruthy();
  });

  it("should get Gloss", () => {
    let schemaObj = JSON.parse(schemaContent);
    schemaInstance = new Schema(schemaObj);
    expect(schemaInstance.getSchema()["glossary"]).toBeTruthy();
  });

  /*        
      
          it('should count fields', () => {
            let schema = JSON.parse(fs.readFileSync(schemaFilenameWithPath, 'utf8'));
            expect(schemaInstance.getFieldsFromSchema()).toEqual('object');
          });
      
          it('should remove duplicate field by key', () => {
            let schemaNormalized = JSON.parse(fs.readFileSync(schemaFilenameWithPath, 'utf8'));
            fs.writeFileSync('src/clean_application.json', JSON.stringify(schemaNormalized, null, 2));
          });
      
          it('should count number of objects', () => {
            let schema = JSON.parse(fs.readFileSync(schemaFilenameWithPath, 'utf8'));
            expect(Object.entries(schema).length).toEqual(1);
          });
          */
});
