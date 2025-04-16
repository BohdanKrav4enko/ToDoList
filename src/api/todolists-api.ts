import axios from "axios";

const token = "00000000-0000-0000-0000-000000000000"
const apiKey = "147034ed-d13d-45f5-8334-08272d51b421"

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey,
    }
    })
export enum TaskStatus {
    New = 0,
    InProgress = 1,
    Complete = 2,
    Draft = 3,
}
export enum TaskPriority {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type TodolistsType={
    id: string;
    title: string;
    addedDate: string;
    order: number
}
type ResponseType<D>={
    resultCode: number
    message: Array<string>
    data: D
}
type TasksResponseType={
    error: string | null;
    totalCount: number
    items: TaskType[]
}
type UpdateTaskType={
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistsType[]>("todo-lists");
    },
    postTodolist(title: string) {
        return instance.post<ResponseType<{items:TodolistsType}>>("todo-lists", {title: title})
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${id}`)
    },
    changeTodolist(id: string, title: string){
        return instance.put<ResponseType<{}>>(`todo-lists/${id}`,{title: title})
    },

    getTasks(todolistId: string){
        return instance.get<TasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTasks(todolistId: string, taskId: string){
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    updateTasks(todolistId: string, taskId: string, model: UpdateTaskType){
        return instance.put<UpdateTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}