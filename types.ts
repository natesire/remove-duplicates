export interface NodeTree {
    statement: string,
    question: string,
    solution?: string,
    yes?: NodeTree,
    no?: NodeTree
}