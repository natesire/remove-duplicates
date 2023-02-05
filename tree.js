"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = void 0;
class Tree {
    constructor(treeFileOrLiteral) {
        this.root = treeFileOrLiteral;
    }
    toString() {
        return JSON.stringify(this);
    }
    toObject(data) {
        return JSON.parse(data);
    }
    getTree() {
        return { test: 'test' };
    }
    search(str) {
        return this.root['yay'];
    }
}
exports.Tree = Tree;
