// class Tree
export default interface TreeLiteral {
    fact: string,
    question: string,
    subNodes: {},
    solution?: string,
    getTree?: () => TreeLiteral
}

export interface TreeNode {
    fact: string,
    question: string,
    solution?: string,
    yay?: TreeNode,
    nay?: TreeNode,
    getTree?: () => TreeNode,
    subNodes: Array<TreeNode>
}