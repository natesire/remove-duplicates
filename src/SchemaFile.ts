import * as fs from 'fs';

export default class SchemaFile {
  contents = {};
  fileName: string;
  schemaDataObj: any = {};

  constructor(fileName: string) {
    this.fileName = fileName;
    this.schemaDataObj = this.read();
  }

  // this will replace getters and setters and make the code more maintainable
  // save the key path to a cache to prevent from re-running this function 
  findKeyInSchema(key: string) {
    // search for key in schema with Depth first search
    if(this.schemaDataObj[key]) {
        return this.schemaDataObj[key];
    } else {
        // traverse down one level for each each key
    }
  }

  objectsFromSchema() {
    // there should only be one versions, [0]
    return this.schemaDataObj.versions[0].objects;
  }

  fieldsFromSchema(objectIndex: number) {
    let fields = this.objectsFromSchema()[objectIndex].fields;
    return fields;
  }

  setFields(objectIndex: number, fields : Object) {
    this.objectsFromSchema()[objectIndex].fields = fields;
  }

  setObjects(objects: any) {
    this.schemaDataObj.versions[0].objects = objects;
  }

  fileType(filename: string): string {
    return this.fileName.split(".").pop() || "";
  }

  read(): Object {
    let output : Object = {};
    let contents = fs.readFileSync(this.fileName, "utf8");
    try {
        output = JSON.parse(contents);
    } catch(e) {
        throw new Error(`${this.fileName} file cannot be parsed as JSON`);
    }
    return output;
  }

  writeOutputFile(outputFile?: string) {

    // validate the JSON
    let jsonStr = JSON.stringify(this.schemaDataObj, null, 2);
    let jsonObj = JSON.parse(jsonStr);

    fs.writeFileSync(outputFile || "schemaOutput/clean_application.test.json", jsonStr);
  }
}