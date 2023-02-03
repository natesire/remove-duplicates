

import { TreeType } from './types';

export class Tree {
    public statement : string;
    public question : string;
    public yes : Tree;
    public no : Tree;

    public data;

    constructor(treeFileOrLiteral: any) {
        // if function exists on object
        if (typeof treeFileOrLiteral.read == 'function') {
            this.data = treeFileOrLiteral.read(); // read from file
        } else {
            this.data = treeFileOrLiteral; // read from literal
        }
    }

    toString() {
        return JSON.stringify(this);
    }

    getTree() {
        //return questionsAnswersTree;
        return { test: 'test' }
    }
}