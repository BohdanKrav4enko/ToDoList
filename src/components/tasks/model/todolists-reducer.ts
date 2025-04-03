import {FilterValuesType, TodolistType} from "../Tasks.tsx";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export const deleteTodolistAC = createAction<{id: string}>('DELETE_TODOLIST')
export const createTodolistAC = createAction('CREATE_TODOLIST', ( id: string, title: string) => {
    return {payload: {title, id }}
})
export const changeTitleTodolistAC = createAction<{title: string, id: string}>('CHANGE_TITLE')

export const changeFilterTodolistAC = createAction<{filter: FilterValuesType, id: string}>('CHANGE_FILTER')

export const todolistId1 = nanoid()
export const todolistId2 = nanoid()
export const todolistId3 = nanoid()

const initialState: TodolistType[] = [
    {id: todolistId1, title: 'What to learn', filter: "all"},
    {id: todolistId2, title: 'What to buy', filter: "all"},
    {id: todolistId3, title: 'Shopping List', filter: "all"}
]

export const todolistsReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        })
        .addCase(createTodolistAC, (state, action) => {
            state.push({ ...action.payload, filter: 'all' })
        })
        .addCase(changeTitleTodolistAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            if (index !== -1) {
                state[index].title = action.payload.title
            }
        })
        .addCase(changeFilterTodolistAC, (state, action) => {
            const todolist = state.find(todolist => todolist.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        })
})


