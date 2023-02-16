"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// handle the tree data structure and algorithms
// covers all the Tree Nodes
class Tree {
    constructor(treeFileOrLiteral) {
        this.subNodes = [];
        // data mapping, lously coupled
        this.dataMap = {
            'response': 'fact',
        };
        this.rootNode = treeFileOrLiteral;
        this.queue = []; // breadth first search
    }
    addSubNode(subNode) {
        this.subNodes.push(subNode);
        let length = this.subNodes.length;
        return this.subNodes[length - 1];
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
        return this.rootNode[this.dataMap['response']];
    }
}
exports.default = Tree;
