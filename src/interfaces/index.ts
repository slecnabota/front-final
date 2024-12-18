export interface IRegister {
    email: string
    username: string
    password: string
    createdAt: string
}

export interface ILogin {
    username: string
    password: string
}

export interface ITask{
    id: string
    title: string
    description: string
    dueDate: string
    status: string
    priority: number
    categoryId: number
    userId: number
    photo: any
}

export interface ISetTask{
    title: string
    description: string
    dueDate: string
    status: string
    priority: number
    categoryId: number
}