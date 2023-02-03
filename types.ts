// class Tree
export default interface TreeLiteral {
    statement: string,
    question: string,
    solution?: string,
    yay?: TreeLiteral,
    nay?: TreeLiteral,
    getTree?: () => TreeLiteral
}