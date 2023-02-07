


export default class Tree {
    public statement? : string;
    public question? : string;
    public solution? : string;
    public yay? : Tree; // sentiment, not boolean
    public nay? : Tree; // and both three letters looks pretty

    public root;

    constructor(treeFileOrLiteral: any) {
        this.root = treeFileOrLiteral;
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

    addChildrenToQueue(queue : Array<Tree>, children : Array<Tree>) : unknown {
        //merge two arrays
        return queue.concat(children);
    }

    search(str:string) {
        return this.root['statement'];
    }
}