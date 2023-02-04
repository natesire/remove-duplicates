


export class Tree {
    public statement : string;
    public question : string;
    public solution : string;
    public yay : Tree; // sentiment, not boolean
    public nay : Tree; // and both three letters looks pretty

    public data;
    public root;

    constructor(treeFileOrLiteral: any) {
        this.root = treeFileOrLiteral;
    }

    toString() {
        return JSON.stringify(this);
    }

    toObject(data:string) : Object {
        return JSON.parse(data);
    }

    getTree() {
        return { test: 'test' }
    }

    search(str:string) {
        return this.root['yay'];
    }
}