// class Tree
export default interface TreeLiteral {
    statement: string,
    question: string,
    children: {},
    solution?: string,
    //yay?: TreeLiteral,
    //nay?: TreeLiteral,
    getTree?: () => TreeLiteral
}

export interface TreeNode {
    statement: string,
    question: string,
    solution?: string,
    yay?: TreeNode,
    nay?: TreeNode,
    getTree?: () => TreeNode
}