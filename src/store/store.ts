import { configureStore } from "@reduxjs/toolkit"
import { taskSlice, tasksReducer } from "./tasks-slice.ts"
import { todolistsReducer, todolistsSlice } from "./todolists-slice.ts"
import { appReducer, appSlice } from "./app-slice.ts"


export const store = configureStore({
  reducer: {
    [taskSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store
