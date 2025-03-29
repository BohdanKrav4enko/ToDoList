import {v4 as uuidv4} from "uuid";
import {TasksStateType} from "../Tasks.tsx";

type AddTaskType = {
    type: 'ADD_TASK',
    payload: {
        todolistId: string
        title: string
    }
}
type RemoveTaskType = {
    type: 'REMOVE_TASK',
    payload: {
        id: string
        todolistId: string
    }
}
type ChangeTitleTaskType = {
    type: 'CHANGE_TASK_TITLE',
    payload: {
        todolistId: string
        title: string
        id: string
    }
}

type ChangeStatusType = {
    type: 'CHANGE_TASK_STATUS',
    payload: {
        todolistId: string
        id: string
        isDone: boolean
    },
}
type AddTodolistType = {
    type: 'ADD_TODOLIST',
    payload: {
        todolistId: string
        title: string
    },
}
type RemoveTodolistType = {
    type: 'REMOVE_TODOLIST',
    payload: {
        todolistId: string
    },
}

type ActionType =
    AddTaskType
    | RemoveTaskType
    | ChangeTitleTaskType
    | ChangeStatusType
    | AddTodolistType
    | RemoveTodolistType


export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'ADD_TASK': {
            return {
                ...state,
                [action.payload.todolistId]: [
                    {id: uuidv4(), title: action.payload.title, isDone: false},
                    ...(state[action.payload.todolistId] || [])]
            };
        }
        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id)
            };
        }
        case 'CHANGE_TASK_TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.id
                    ? {...t, title: action.payload.title}
                    : t
                )
            };
        }
        case 'CHANGE_TASK_STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.id
                    ? {...t, isDone: action.payload.isDone}
                    : t
                )
            }
        }
        case 'ADD_TODOLIST': {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }
        case 'REMOVE_TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.payload.todolistId];
            return stateCopy
        }
        default:
            throw new Error('Unknown action type');

    }
}
export const removeToodolistAC = (todolistId: string): RemoveTodolistType => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {todolistId}
    }
}
export const addToodolistAC = (todolistId: string, title: string): AddTodolistType => {
    return {
        type: 'ADD_TODOLIST',
        payload: {todolistId, title}
    }
}
export const addTaskAC = (todolistId: string, title: string): AddTaskType => {
    return {
        type: 'ADD_TASK',
        payload: {todolistId, title}
    }
}
export const removeTaskAC = (id: string, todolistId: string): RemoveTaskType => {
    return {
        type: 'REMOVE_TASK',
        payload: {id, todolistId}
    }
}
export const changeTitleTaskAC = (todolistId: string, title: string, id: string): ChangeTitleTaskType => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {todolistId, title, id}
    }
}
export const changeTaskStatusAC = (todolistId: string, id: string, isDone: boolean): ChangeStatusType => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: {todolistId, id, isDone}
    }
}