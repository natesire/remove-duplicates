"use strict";
exports.__esModule = true;
var fileManager_1 = require("../fileManager");
describe("class", function () {
    it("should return property", function () {
        var treeFile = new fileManager_1["default"]('js.tree.json');
        expect(treeFile.read()).toMatch(/what are you searching for/);
    });
    it("should write", function () {
        var treeFile = new fileManager_1["default"]('js.tree.json');
        expect(treeFile.read()).toMatch(/what are you searching for/);
    });
});
