import * as fs from 'fs';

export default class SchemaFile {
  contents = {};
  fileName: string = "js.tree.json";
  schemaDataObj: any = {};

  constructor(fileName: string = "js.tree.json") {
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
    let contents = fs.readFileSync(this.fileName, "utf8");
    return JSON.parse(contents);
  }

  writeFile() {
    fs.writeFile("schemaOutput/clean_application.test.json", JSON.stringify(this.schemaDataObj), function (err) {
      if (err) return console.log(err);
    });
  }
}