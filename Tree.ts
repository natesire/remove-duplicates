// handle the tree data structure and algorithms
// covers all the Tree Nodes
export default class Tree {
    public statement? : string;
    public question? : string;
    public solution? : string;
    public yay? : Tree; // only one allowed per node
    public nay? : Tree; // only one allowed per node
    public queue : Array<Tree>;
    public root;
    public subNodes : Array<Tree> = [];

    constructor(treeFileOrLiteral: any) {
        this.root = treeFileOrLiteral;
        this.queue = []; // breadth first search
    }

    addSubNode(subNode : Tree) {
        this.subNodes.push(subNode);
        let length = this.subNodes.length;
        return this.subNodes[length - 1];
    }

    toString() {
        return JSON.stringify(this);
    }

    JSONToObject(jsonData:string) : Object {
        return JSON.parse(jsonData);
    }

    YAMLToJSON(yamlData:string) : Object {
        return JSON.parse(yamlData);
    }

    getTree() {
        return { test: 'test' }
    }

    addChildrenToQueue(children : Array<Tree> | Tree) : Array<Tree> {
        this.queue = this.queue.concat(children);
        return this.queue;
    }

    search(str:string) {
        return this.root['statement'];
    }
}