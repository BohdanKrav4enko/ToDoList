import {TasksStateType} from "../Tasks.tsx";
import {todolistId1, todolistId2, todolistId3} from "./todolists-reducer.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export const removeToodolistAC = createAction<{todolistId: string}>('REMOVE_TODOLIST')
export const addToodolistAC = createAction<{todolistId: string, title: string}>('ADD_TODOLIST')
export const addTaskAC = createAction<{todolistId: string, title: string}>('ADD_TASK')
export const removeTaskAC = createAction<{id: string, todolistId: string}>('REMOVE_TASK')
export const changeTitleTaskAC = createAction<{todolistId: string, title: string, id: string}>('CHANGE_TASK_TITLE')
export const changeTaskStatusAC = createAction<{todolistId: string, id: string, isDone: boolean}>('CHANGE_TASK_STATUS')

const initialState: TasksStateType = {
    [todolistId1]: [
        {id: nanoid(), title: 'CSS', isDone: true},
        {id: nanoid(), title: 'HTML', isDone: false},
        {id: nanoid(), title: 'JS', isDone: false},
        {id: nanoid(), title: 'Redux', isDone: false},
    ],
    [todolistId2]: [
        {id: nanoid(), title: 'Milk', isDone: true},
        {id: nanoid(), title: 'Snickers', isDone: false},
        {id: nanoid(), title: 'Book', isDone: true},
        {id: nanoid(), title: 'Brad', isDone: true},
    ],
    [todolistId3]: [
        {id: nanoid(), title: 'Apple', isDone: false},
        {id: nanoid(), title: 'Notebook', isDone: true},
        {id: nanoid(), title: 'Juice', isDone: false},
        {id: nanoid(), title: 'Headphones', isDone: true},
        {id: nanoid(), title: 'Backpack', isDone: false},
        {id: nanoid(), title: 'Pen', isDone: true}
    ]
}
export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(addToodolistAC, (state, action) => {
            state[action.payload.todolistId] = []
        })
        .addCase(removeToodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        })
        .addCase(addTaskAC, (state, action) => {
            const { todolistId, title } = action.payload;
            if (!state[todolistId]) {
                state[todolistId] = [];
            }
            state[todolistId].unshift({
                id: nanoid(),
                title,
                isDone: false
            });
        })
        .addCase(removeTaskAC, (state, action) => {
            const { todolistId, id } = action.payload;
            if (state[todolistId]) {
                const index = state[todolistId].findIndex(task => task.id === id);
                if (index !== -1) {
                    state[todolistId].splice(index, 1);
                }
            }
        })
        .addCase(changeTitleTaskAC, (state, action) => {
            const { todolistId, title, id } = action.payload;
            if (state[todolistId]) {
                const task = state[todolistId].find(task => task.id === id);
                if (task) {
                    task.title = title;
                }
            }
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const { todolistId, id, isDone } = action.payload;
            if (state[todolistId]) {
                const task = state[todolistId].find(task => task.id === id);
                if (task) {
                    task.isDone = isDone;
                }
            }
        })
})
