import fs from 'fs';
//import Mapping from "../Mapping.js";

// DRY, path to the fields inside the schema

function getFieldsFromSchema(schema:any) : Map<string, any> { 

  let mapFields = new Map(); // want to get fields into a Map ASAP or Object can dump a ton of conflicting fields into the schema

  // "versions" contains an array of 1, which has a key named "objects", which holds an array of objects, which each object has a "fields" that is an array of objects
  let fieldsArrayOfObjects = schema.versions[0].objects[0].fields as Object; // returns an array of objects, named "fields"

  // iterate through and map each field as unique
  Object.entries(fieldsArrayOfObjects).forEach(field => {
    // field[0] // where is this coming from ?
    let key = field[1]['key'];
    let value = field[1]
    mapFields.set(key, value);
  });
  return mapFields;
}

describe('schema', () => {

  let schemaFilenameWithPath: string;

  beforeAll(() => {
    // extract "versions" from the schema 
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

  it('should receive an object', () => {
    let schema = JSON.parse(fs.readFileSync(schemaFilenameWithPath, 'utf8'));
    expect(typeof getFieldsFromSchema(schema)).toEqual('object');
  });
 
  it('should count fields', () => {
    let schema = JSON.parse(fs.readFileSync(schemaFilenameWithPath, 'utf8'));
    expect(getFieldsFromSchema(schema)).toEqual('object');
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