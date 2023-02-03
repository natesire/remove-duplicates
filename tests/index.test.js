"use strict";
exports.__esModule = true;
// file: class_a.test.js
var index_1 = require("../index");
jest.mock("../index");
it("should mock class B", function () {
    var functionNameMock = jest.fn();
    //jest.spyOn(index_1.Question.prototype, "search").mockImplementation(functionNameMock);
});
