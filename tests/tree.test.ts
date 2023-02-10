import Tree from '../Tree';
import FileManager from '../FileManager';
import TreeLiteral from '../Types';
import TreeNode from '../Types';
import '../Array'; // bad practice modiying global array prototype

// in case we want to deal with code
let dataTreeJS0 : TreeLiteral = {
    "statement": "statement0",
    "question": "question0 what are you searching for?",
    "yay": {
        "statement": "statement1",
        "question": "question1",
        "yay": {
            "statement": "statement2",
            "question": "question2",
            "yay": {
                "statement": "statement3",
                "question": "question3",
            },

        "nay": {
            "statement": "statement4",
            "question": "question4",
            },
        } 
    }
}

let dataTreeJS1 : TreeLiteral = {
    "statement": "statementA",
    "question": "question0 what would you like to schedule?",
    "yay": {
        "statement": "statement1",
        "question": "question1",
        "yay": {
            "statement": "statement2",
            "question": "question2",
            "yay": {
                "statement": "statement3",
                "question": "question3",
            },

        "nay": {
            "statement": "statement4",
            "question": "question4",
            },
        } 
    }
}

let dataTreeJS2 : TreeLiteral = {
    "statement": "Cannot set property '0' of undefined : trees[0] = new Tree(dataTreeJS0)",
    "question": "try using push?",
    "yay": {
        "statement": "statement1",
        "question": "question1",
        "yay": {
            "statement": "statement2",
            "question": "question2",
            "yay": {
                "statement": "statement3",
                "question": "question3",
            },

        "nay": {
            "statement": "statement4",
            "question": "question4",
            },
        } 
    }
}

let dataTreeJS3 : TreeLiteral = {
    "statement": "Cannot set property '0' of undefined : trees[0] = new Tree(dataTreeJS0)",
    "question": "try using push?",
    "yay": {
        "statement": "statement1",
        "question": "question1",
        "yay": {
            "statement": "statement2",
            "question": "question2",
            "yay": {
                "statement": "statement3",
                "question": "question3",
            },

        "nay": {
            "statement": "statement4",
            "question": "question4",
            },
        } 
    }
}



describe("class Tree", () => {
    describe('from file', () => {
        let treeFile : FileManager;
        let dataObj : Object;
        let tree : Tree;
        let treeRoot : TreeNode; 

        beforeEach(() => {
            treeFile = new FileManager('data/schedule.tree.yaml');
            dataObj = treeFile.read();
            tree = new Tree(dataObj);
            treeRoot = tree.root;
        });

        it("should load tree from file", () => {
            expect(treeRoot['question']).toMatch('schedule')
        });
    });

    describe('from literal', () => {
        let tree : Tree;
        let treeRoot : TreeNode;

        beforeEach(() => {
            tree = new Tree(dataTreeJS0);
            treeRoot = tree.root;
        });

        it("should load tree from literal", () => {
            expect(treeRoot['question']).toMatch('question0')
        });

    
        it("should return tree data", () => {
            expect(treeRoot['statement']).toMatch('statement0')
        });
    });

    describe('breadth first search', () => {
        let trees : Array<Tree> = [];

        beforeEach(() => {
            trees = [];
            trees.push(new Tree(dataTreeJS0));
            trees.push(new Tree(dataTreeJS1));
            trees.push(new Tree(dataTreeJS2));
            trees.push(new Tree(dataTreeJS3)); // what if one is a copy?
        });

        it('should add one child to queue for breadth first search BFS', () => {
            let treeAlgoOn = trees.first();
            let firstChildNode = trees[1]
            let queueBFS = treeAlgoOn.addChildrenToQueue(firstChildNode); 
            expect(queueBFS.length).toBe(1);
        });

        it('should add children Array to queue for breadth first search', () => {
            let treeAlgoOn = trees.first();
            let secondChildNode = trees[2]
            let queue = treeAlgoOn.addChildrenToQueue([secondChildNode]); // queue for breadth first search
            expect(queue.length).toBe(1);
        });

        it('should add two children to queue for breadth first search BFS', () => {
            let treeAlgoOn = trees.first();
            let thirdChildNode = trees[3];
            treeAlgoOn.addChildrenToQueue([trees[1]]);
            let queue = treeAlgoOn.addChildrenToQueue([thirdChildNode]); // queue for breadth first search
            expect(queue.length).toBe(2);
        });

        /*it('should match concatenated TreeNode', () => {
            trees[0].addChildrenToQueue([trees[1]]);
            let queue = trees[0].addChildrenToQueue([trees[2]]); // queue for breadth first search

            expect(queue.length).toBe(2);
        });*/
    });
    
    /*
    it("should search first level", () => {
        const tree = new Tree(dataTreeJS);
        let search = tree.search('statement1')
        expect(search['question']).toMatch('question0')
    });

    /*
    it("DEBUG should search zero level", () => {
        const tree = new Tree(dataTreeJS);
        let search = tree.getChildren()
        expect(search).toMatch('')
    });
    */
});
