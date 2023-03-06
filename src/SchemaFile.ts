import * as fs from 'fs';
const yaml = require('js-yaml');

export default class SchemaFile {
  contents = {};
  fileName: string = "js.tree.json";
  constructor(fileName: string = "js.tree.json") {
    this.fileName = fileName;
    this.read();
  }

  schema(): any {
    this.contents = JSON.parse(this.read());
    return this.contents;
  }

  objectsFromSchema() {
    return this.schema().versions[0].objects;
  }

  setObjects(objects: any) {
    this.schema().versions[0].objects = objects;
  }

  fileType(filename: string): string {
    return this.fileName.split(".").pop() || "";
  }

  read(): string {
    return fs.readFileSync(this.fileName, "utf8");
  }

  writeFile() {
    fs.writeFile("schemaOutput/clean_application.json", JSON.stringify(this.schema()), function (err) {
      if (err) return console.log(err);
    });
  }
}