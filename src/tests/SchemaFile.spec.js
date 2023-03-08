"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const SchemaFile_js_1 = __importDefault(require("../SchemaFile.js"));
let schemaFilename;
let cleanTestSchemaFilename;
let schemaContentFromFile;
describe("SchemaFile", () => {
    beforeAll(() => {
        schemaFilename = path_1.default.join(__dirname, "mock.json");
        cleanTestSchemaFilename = path_1.default.join(__dirname, "../../schemaOutput/clean_application.test.json");
        schemaContentFromFile = fs_1.default.readFileSync(schemaFilename, "utf8");
    });
    describe("findKey", () => {
        it("should return first key found", () => {
            let treeFilename = path_1.default.join(__dirname, "tree.json");
            let treeFile = new SchemaFile_js_1.default(treeFilename);
            expect(treeFile.findKeyInSchema("versions")).toBeTruthy();
        });
    });
    it("should write to output file", () => {
        let schemaFile = new SchemaFile_js_1.default(schemaFilename);
        schemaFile.writeOutputFile();
    });
    it("should receive schema data with correct shape", () => {
        let schemaFile = new SchemaFile_js_1.default(schemaFilename);
        let schemaData = schemaFile.schemaDataObj;
        let lastObj = schemaData["versions"][0]["objects"];
        expect(schemaData["versions"][0]["objects"][0].key).toMatch(/object/);
    });
    it("should find key for duplicate object", () => {
        let schemaFile = new SchemaFile_js_1.default(schemaFilename);
        let schemaObj = schemaFile.schemaDataObj;
        let lastObj = schemaObj["versions"][0]["objects"];
        expect(lastObj[0]).toEqual({ key: "object_1" });
    });
    it("should create unique array of objects", () => {
        let uniqueSet = new Set();
        let actualItem;
        let uniqueArrayOfObjects = Array();
        let literal = [{ key: 1 }, { key: 1 }, { key: 2 }];
        Object.entries(literal).forEach((item) => {
            actualItem = item[1];
            if (!uniqueSet.has(actualItem.key)) {
                uniqueArrayOfObjects.push(actualItem);
            }
            uniqueSet.add(actualItem.key); // value (key) is at index 0
        });
        /*fs.writeFileSync(
          cleanTestSchemaFilename,
          JSON.stringify(uniqueArrayOfObjects)
        );*/
        expect(uniqueArrayOfObjects.length).toEqual(2);
    });
    it("should write JSON unique array of objects", () => {
        let uniqueSet = new Set();
        let actualItem;
        let uniqueArrayOfObjects = Array();
        let literal = [{ key: 1 }, { key: 1 }, { key: 2 }];
        Object.entries(literal).forEach((item) => {
            actualItem = item[1];
            if (!uniqueSet.has(actualItem.key)) {
                uniqueArrayOfObjects.push(actualItem);
            }
            uniqueSet.add(actualItem.key); // value (key) is at index 0
        });
        fs_1.default.writeFileSync(cleanTestSchemaFilename, JSON.stringify(uniqueArrayOfObjects));
        expect(fs_1.default.readFileSync(cleanTestSchemaFilename).toString()).toEqual(JSON.stringify(uniqueArrayOfObjects));
    });
    it("should write JSON unique array of objects with iterator", () => {
        let uniqueSet = new Set();
        let uniqueArrayOfObjects = Array();
        let arrayOfObjects = [{ key: 1 }, { key: 1 }, { key: 2 }];
        arrayOfObjects.forEach((item) => {
            if (!uniqueSet.has(item.key)) {
                uniqueArrayOfObjects.push(item);
            }
            uniqueSet.add(item.key);
        });
        fs_1.default.writeFileSync(cleanTestSchemaFilename, JSON.stringify(uniqueArrayOfObjects));
        expect(fs_1.default.readFileSync(cleanTestSchemaFilename).toString()).toEqual(JSON.stringify(uniqueArrayOfObjects));
    });
    it("should remove duplicate field by key", () => {
        let schemaNormalized = JSON.parse(fs_1.default.readFileSync(schemaFilename, "utf8"));
        fs_1.default.writeFileSync("src/clean_application.json", JSON.stringify(schemaNormalized, null, 2));
    });
    it("dir path should not contain duplicate files", () => {
        expect(__dirname).toContain("src\\tests");
    });
    it("dir path should not contain duplicate files", () => {
        expect(fs_1.default.existsSync("src\\tests\\mock.json")).toBe(true);
    });
    it("writes the clean file", () => {
        let test = "test";
        // write to file
        fs_1.default.writeFileSync("clean.output.json", test);
        expect(fs_1.default.existsSync("clean.output.json")).toBe(true);
    });
    it("writes the clean file", () => {
        let test = "test";
        // write to file
        fs_1.default.writeFileSync("clean.output.json", test);
        let read = fs_1.default.readFileSync("clean.output.json", "utf8");
        expect(read).toBe(test);
    });
    // ensures the other tests has duplicate objects to test against
    it("should find duplicate keys inside objects from JSON", () => {
        let schemaObj = JSON.parse(schemaContentFromFile);
        let objectsWithDups = Object.entries(schemaObj["versions"][0]["objects"]);
        expect(objectsWithDups.length).toEqual(3);
    });
});
