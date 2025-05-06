export type DomainTask = {
  description: string
  title: string
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}
export type GetTasksResponse = {
  error: string
  totalCount: number
  items: DomainTask[]
}
export type UpdateTaskModel = {
  description: string
  title: string
  status: number
  priority: number
  startDate: string
  deadline: string
}
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
  Later = 4,
}
