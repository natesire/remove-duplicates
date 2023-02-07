"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tree {
    constructor(treeFileOrLiteral) {
        this.root = treeFileOrLiteral;
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
    addChildrenToQueue(queue, children) {
        //merge two arrays
        return queue.concat(children);
    }
    search(str) {
        return this.root['statement'];
    }
}
exports.default = Tree;
