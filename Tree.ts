

import { TreeLiteral } from './types';

export class Tree {
    public statement : string;
    public question : string;
    public solution : string;
    public yay : Tree; // sentiment, not boolean
    public nay : Tree; // and both three letters looks pretty

    public data;

    constructor(treeFileOrLiteral: any) {
        // if function exists on object
        if (typeof treeFileOrLiteral.read == 'function') {
            // who is responsible to convert string rep to object?
            this.data = this.toObject(treeFileOrLiteral.read()); // read from file
        } else {
            this.data = treeFileOrLiteral; // read from literal
        }
    }

    toString() {
        return JSON.stringify(this);
    }

    toObject(data:string) : Object {
        return JSON.parse(data);
    }

    getTree() {
        //return questionsAnswersTree;
        return { test: 'test' }
    }
}