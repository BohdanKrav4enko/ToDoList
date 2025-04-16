import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {tasksReducer} from '../components/tasks/model/tasks-reducer.ts'
import {todolistsReducer} from '../components/tasks/model/todolists-reducer.ts'
import {appReducer} from "./app-reducer.ts";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    appTheme: appReducer
})

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store