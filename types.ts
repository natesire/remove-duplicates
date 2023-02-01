export interface NodeTree {
    statement: string,
    question: string,
    solution?: string,
    yes?: Node,
    no?: Node
}