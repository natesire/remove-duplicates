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
    this.contents = JSON.parse(this.rawContents());
    return this.contents;
  }

  objectsFromSchema() {
    return this.schema().versions[0].objects;
  }

  fileType(filename: string): string {
    return this.fileName.split(".").pop() || "";
  }

  read(): Object {
    if (this.fileType(this.fileName) == "json")
      this.contents = this.rawContents();
    return this.contents;
  }

  rawContents(): string {
    return fs.readFileSync(this.fileName, "utf8");
  }

  writeFile(data: string) {
    fs.writeFile("schemaOutput/clean_application.json", data, function (err) {
      if (err) return console.log(err);
    });
  }
}