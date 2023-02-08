"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// handle the tree data structure and algorithms
// covers all the Tree Nodes
class Tree {
    constructor(treeFileOrLiteral) {
        this.root = treeFileOrLiteral;
        this.queue = []; // breadth first search
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
        this.queue = this.queue.concat(children);
        return this.queue;
    }
    search(str) {
        return this.root['statement'];
    }
}
exports.default = Tree;
