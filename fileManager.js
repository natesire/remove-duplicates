"use strict";
exports.__esModule = true;
var fs = require("fs");
var FileManager = /** @class */ (function () {
    function FileManager(fileName) {
        this.fileName = fileName;
    }
    FileManager.prototype.writeToFile = function (data, fileName) {
        var dataFormatted = 'default data';
        if (typeof data == 'object') {
            dataFormatted = JSON.stringify(data);
        }
        fs.writeFile(fileName, dataFormatted, function (err) {
            if (err)
                return console.log(err);
        });
    };
    return FileManager;
}());
exports["default"] = FileManager;
