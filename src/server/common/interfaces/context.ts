type User = {
    id: number
    name: string
    role: string
}

export interface Context {
    user?: User
    take: number
    skip: number
} 