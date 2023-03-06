export default class Schema {
  schemaData;
  versions : any;
  objectsFromSchema : any;

  // Schema doesn't know anything about files. It expects an Object.
  constructor(schemaObj: any) {
    //if(!!schema) { throw new Error('Schema is Falsy'); }
    this.schemaData = schemaObj;
  }

  // arrayOfObjects should have shape: [{ key: 1 }, { key: 1 }, { key: 2 }] from the schema file
  public uniqueArrayOfObjects(arrayOfObjects: Array<any>): Array<object> {
    let uniqueArrayOfObjects = Array<object>();
    let uniqueSetOfKeys = new Set();

    // production ready tests for specific errors
    if(arrayOfObjects === undefined) throw new Error('arrayOfObjects is undefined');
    if(!(typeof arrayOfObjects.forEach === 'function')) throw new Error('arrayOfObjects is Falsy');

    arrayOfObjects.forEach((objectInJSONSchema) => {
      if (!uniqueSetOfKeys.has(objectInJSONSchema.key)) uniqueArrayOfObjects.push(objectInJSONSchema);
      uniqueSetOfKeys.add(objectInJSONSchema.key); 
    });

    return uniqueArrayOfObjects;
  }
}