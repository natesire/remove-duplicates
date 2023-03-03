import fs from 'fs';
import Scheme from "../Scheme.js";

describe('schema', () => {
  let schemaFilenameWithPath: string;
  let schemaInstance: Scheme;

  beforeAll(() => {
    schemaFilenameWithPath = 'mock_application.versions.json';
    //schemaInstance = new Scheme(fs.readFileSync(schemaFilenameWithPath, 'utf8'));
  });

  describe('setup', () => {
    it('should stringify schema as a string', () => {
      let schemaObj = {
        test: "test"
      }

      let str = JSON.stringify(schemaObj);

      expect(str).toMatch('test');
    });
  });

  describe('misc', () => {
    
        it('should find versions element', () => {
          let schemaContent = fs.readFileSync(schemaFilenameWithPath, 'utf8')
          expect(JSON.parse(schemaContent).versions).toBeTruthy();
        });
   /* 
        it('should find versions element', () => {
          let schemaInt = new Scheme(fs.readFileSync(schemaFilenameWithPath, 'utf8'));
    
          expect(schemaInt.schemaData).toBeTruthy();
        });
    
        it('should receive an object', () => {
          let schema = JSON.parse(fs.readFileSync(schemaFilenameWithPath, 'utf8'));
          expect(typeof schemaInstance.getFieldsFromSchema()).toEqual('object');
        });
    
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
});