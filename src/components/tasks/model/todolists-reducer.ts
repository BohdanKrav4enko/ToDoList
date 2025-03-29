import {FilterValuesType, TodolistType} from "../Tasks.tsx";

type RemoveTodolistActionType = {
    type: 'DELETE_TODOLIST',
    payload: {
        id: string
    }
}
type AddTodolistActionType = {
    type: 'CREATE_TODOLIST',
    payload: {
        id: string
        title: string
    }
}
type ChangeTitleActionType = {
    type: 'CHANGE_TITLE',
    payload: {
        title: string,
        id: string
    }
}
type ChangeFilterActionType = {
    type: 'CHANGE_FILTER',
    payload: {
        filter: FilterValuesType,
        id: string
    }
}
type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeFilterActionType | ChangeTitleActionType

const initialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'DELETE_TODOLIST': {
            return state.filter(t => t.id !== action.payload.id )
        }
        case 'CREATE_TODOLIST': {
            return [...state, {id: action.payload.id, title: action.payload.title, filter: 'all'}]
        }
        case 'CHANGE_TITLE': {
            const todolist = state.find(tl => tl.id === action.payload.id)
            if (todolist) {
                todolist.title = action.payload.title
            }
            return [...state]
        }
        case 'CHANGE_FILTER': {
            const todolist = state.find(t => t.id === action.payload.id);
            if (todolist) {
                todolist.filter = action.payload.filter;
            }
            return [...state]
        }
        default:
            throw new Error(`Unknown action type`);
    }
}
export const deleteTodolistAC = (id: string): RemoveTodolistActionType => {
    return {
        type: 'DELETE_TODOLIST' as const,
        payload: {id}
    }
}
export const createTodolistAC = (id: string, title: string): AddTodolistActionType => {
    return {
        type: 'CREATE_TODOLIST' as const,
        payload: {id, title}
    }
}
export const changeTitleTodolistAC = (title: string, id: string): ChangeTitleActionType => {
    return {
        type: 'CHANGE_TITLE' as const,
        payload: {title, id}
    }
}
export const changeFilterTodolistAC = (filter: FilterValuesType, id: string,):ChangeFilterActionType => {
    return {
        type: 'CHANGE_FILTER' as const,
        payload: {filter, id}
    }
}

