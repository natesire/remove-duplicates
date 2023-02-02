"use strict";
exports.__esModule = true;
var fs = require("fs");
var FileManager = /** @class */ (function () {
    function FileManager(fileName) {
        if (fileName === void 0) { fileName = 'js.tree.json'; }
        this.fileName = 'js.tree.json';
        this.fileName = fileName;
    }
    FileManager.prototype.read = function () {
        return fs.readFileSync('js.tree.json', 'utf8');
    };
    FileManager.prototype.writeToFile = function (data) {
        var dataFormatted = 'default data';
        if (typeof data == 'object') {
            dataFormatted = JSON.stringify(data);
        }
        fs.writeFile('js.tree.json', dataFormatted, function (err) {
            if (err)
                return console.log(err);
        });
    };
    return FileManager;
}());
exports["default"] = FileManager;
