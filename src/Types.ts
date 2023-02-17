// class Tree
export default interface TreeLiteral {
    text: string,
    question: string,
    subNodes: {},
    solution?: string,
    getTree?: () => TreeLiteral
}

export interface TreeNode {
    text: string,
    question: string,
    solution?: string,
    yay?: TreeNode,
    nay?: TreeNode,
    getTree?: () => TreeNode,
    subNodes: Array<TreeNode>
}