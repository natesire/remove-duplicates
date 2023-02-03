export interface TreeType {
    statement: string,
    question: string,
    solution?: string,
    yes?: TreeType,
    no?: TreeType,
    getTree?: () => TreeType
}