"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// should this class handle the whole Tree? or per node?
class Tree {
    constructor(treeFileOrLiteral) {
        this.root = treeFileOrLiteral;
        this.queue = [this.root]; // for the whole tree
    }
    toString() {
        return JSON.stringify(this);
    }
    JSONToObject(jsonData) {
        return JSON.parse(jsonData);
    }
    YAMLToJSON(yamlData) {
        return JSON.parse(yamlData);
    }
    getTree() {
        return { test: 'test' };
    }
    addChildrenToQueue(children) {
        return this.queue.concat(children);
    }
    search(str) {
        return this.root['statement'];
    }
}
exports.default = Tree;
