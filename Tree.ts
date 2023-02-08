// handle the tree data structure and algorithms
// covers all the Tree Nodes
export default class Tree {
    public statement? : string;
    public question? : string;
    public solution? : string;
    public yay? : Tree; // sentiment, not boolean
    public nay? : Tree; // and both three letters looks pretty
    public queue : Array<Tree>;
    public root;

    constructor(treeFileOrLiteral: any) {
        this.root = treeFileOrLiteral;
        this.queue = []; // breadth first search
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

    addChildrenToQueue(children : Array<Tree>) : Array<Tree> {
        return this.queue.concat(children);
    }

    search(str:string) {
        return this.root['statement'];
    }
}