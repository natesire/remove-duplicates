export default class Schema {
  schemaData;
  versions : any;
  objectsFromSchema : any;

  // Schema doesn't know anything about files. It expects an Object.
  constructor(schema: any) {
    //if(!!schema) { throw new Error('Schema is Falsy'); }
    console.log(schema);
    this.schemaData = schema;
    this.versions = this.schemaData.versions;
    this.objectsFromSchema = this.versions?.objects;
  }

  public cleanedSubSchema(schemaFile: unknown): Array<object> {
    return [];
  }

  public getSchema(key?: string) {
    if (key) return this.schemaData[key];
    return this.schemaData;
  }

  // arrayOfObjects should have shape: [{ key: 1 }, { key: 1 }, { key: 2 }] from the schema file
  public uniqueArrayOfObjects(arrayOfObjects: Array<any>): Array<object> {
    let uniqueArrayOfObjects = Array<object>();
    let uniqueSetOfKeys = new Set();

    arrayOfObjects.forEach((objectInJSONSchema) => {
      if (!uniqueSetOfKeys.has(objectInJSONSchema.key)) uniqueArrayOfObjects.push(objectInJSONSchema);
      uniqueSetOfKeys.add(objectInJSONSchema.key); 
    });

    return uniqueArrayOfObjects;
  }
}