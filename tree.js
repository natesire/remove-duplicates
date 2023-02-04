"use strict";
exports.__esModule = true;
exports.Tree = void 0;
var Tree = /** @class */ (function () {
    function Tree(treeFileOrLiteral) {
        // if function exists on object
        if (typeof treeFileOrLiteral.read == 'function') {
            // who is responsible to convert string rep to object?
            this.data = this.toObject(treeFileOrLiteral.read()); // read from file
        }
        else {
            this.data = treeFileOrLiteral; // read from literal
        }
    }
    Tree.prototype.toString = function () {
        return JSON.stringify(this);
    };
    Tree.prototype.toObject = function (data) {
        return JSON.parse(data);
    };
    Tree.prototype.getTree = function () {
        //return questionsAnswersTree;
        return { test: 'test' };
    };
    Tree.prototype.search = function (str) {
        return this.data['yay'];
    };
    return Tree;
}());
exports.Tree = Tree;
