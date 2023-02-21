import fs from 'fs';
//import Mapping from "../Mapping.js";

// DRY, path to the fields inside the schema
function getFieldsFromSchema(schema:any) : Object {
  return schema.versions[0].objects[0].fields as Object;
}

describe('schema', () => {

  let schemaFilenameWithPath: string;

  beforeAll(() => {
    // easier to extract a finer schema, versions, to work with for tests
    schemaFilenameWithPath = './mock_application.versions.json';
  });

  it('should read schema', () => {
    let schema = JSON.parse(fs.readFileSync(schemaFilenameWithPath, 'utf8'));
    expect(schema).toBeTruthy();
  });

  it('should find versions element', () => {
    let schema = JSON.parse(fs.readFileSync(schemaFilenameWithPath, 'utf8'));
    expect(getFieldsFromSchema(schema)).toBeTruthy();
  });

  it('should remove duplicate field by key', () => {
    let schemaNormalized = JSON.parse(fs.readFileSync(schemaFilenameWithPath, 'utf8'));
    fs.writeFileSync('src/clean_application.json', JSON.stringify(schemaNormalized, null, 2));
  });

  it('should receive an Object type from JSON.parse', () => {
    let schema = JSON.parse(fs.readFileSync(schemaFilenameWithPath, 'utf8'));
    expect(typeof getFieldsFromSchema(schema)).toEqual('object');
  });

  it('should count number of objects', () => {
    let schema = JSON.parse(fs.readFileSync(schemaFilenameWithPath, 'utf8'));
    expect(Object.entries(schema).length).toEqual(1);
  });
});