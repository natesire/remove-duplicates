"use strict";
exports.__esModule = true;
exports.Tree = void 0;
var Tree = /** @class */ (function () {
    function Tree(treeFileOrLiteral) {
        // if function exists on object
        if (typeof treeFileOrLiteral.read == 'function') {
            this.data = treeFileOrLiteral.read(); // read from file
        }
        else {
            this.data = treeFileOrLiteral; // read from literal
        }
    }
    Tree.prototype.toString = function () {
        return JSON.stringify(this);
    };
    Tree.prototype.getTree = function () {
        //return questionsAnswersTree;
        return { test: 'test' };
    };
    return Tree;
}());
exports.Tree = Tree;
