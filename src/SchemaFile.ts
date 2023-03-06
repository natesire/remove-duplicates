import * as fs from 'fs';

export default class SchemaFile {
  contents = {};
  fileName: string;
  schemaDataObj: any = {};

  constructor(fileName: string) {
    this.fileName = fileName;
    this.schemaDataObj = this.read();
  }

  objectsFromSchema() {
    return this.schemaDataObj.versions[0].objects;
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

  writeOutputFile() {

    // validate the JSON
    let jsonStr = JSON.stringify(this.schemaDataObj, null, 2);
    let jsonObj = JSON.parse(jsonStr);

    fs.writeFileSync("schemaOutput/clean_application.test.json", jsonStr);
  }
}