import { createAsyncThunk } from "@reduxjs/toolkit"
import { TodolistType } from "@/api/todolistApi.types.ts"
import { todolistsApi } from "@/api/todolists-api.ts"
import { createAppSlice } from "@/common/utils/createAppSlice.ts"
import { changeStatusAC } from "@/store/app-slice.ts"

export type FilterValuesType = "all" | "completed" | "active"

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  selectors: {
    selectTodolist: state => state
  },
  reducers: (create) => {
    return {
      changeFilterTodolistAC: create.reducer<{ filter: FilterValuesType; id: string }>((state, action) => {
        return state.map((todolist) =>
          todolist.id === action.payload.id
            ? { ...todolist, filter: action.payload.filter }
            : todolist
        )
      })
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchTodolistsTC.fulfilled, (_state, action) => {
      if (!action.payload) return _state
      return action.payload.todolists.map(tl => ({ ...tl, filter: "all" }))
    })
    builder.addCase(changeTodolistsTitleTC.fulfilled, (state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: "all" })
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      })
  }
})
export const createTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/createTodolistTC`,
  async (title: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(changeStatusAC({status: 'loading'}))
      const res = await todolistsApi.createTodolist(title)
      thunkAPI.dispatch(changeStatusAC({status: 'succeeded'}))
      return { todolist: res.data.data.item }
    } catch (error) {
      thunkAPI.dispatch(changeStatusAC({status: 'failed'}))
      return thunkAPI.rejectWithValue(null)
    }
  },
)

export const deleteTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/deleteTodolistTC`,
  async (id: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(changeStatusAC({status: 'loading'}))
      await todolistsApi.deleteTodolist(id)
      thunkAPI.dispatch(changeStatusAC({status: 'succeeded'}))
      return { id }
    } catch (error) {
      thunkAPI.dispatch(changeStatusAC({status: 'failed'}))
      return thunkAPI.rejectWithValue(null)
    }
  },
)
export const fetchTodolistsTC = createAsyncThunk(`${todolistsSlice.name}/fetchTodolistsTC`,
  async (_arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(changeStatusAC({status: 'loading'}))
      const res = await todolistsApi.getTodolists()
      thunkAPI.dispatch(changeStatusAC({status: 'succeeded'}))
      return { todolists: res.data }
    } catch (error) {
      thunkAPI.dispatch(changeStatusAC({status: 'failed'}))
      return thunkAPI.rejectWithValue(error)
    }
  })
export const changeTodolistsTitleTC = createAsyncThunk<
  { id: string; title: string },
  { id: string; title: string }
>(`${todolistsSlice.name}/changeTodolistsTitleTC`,
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(changeStatusAC({status: 'loading'}))
      await todolistsApi.changeTodolistTitle(arg)
      thunkAPI.dispatch(changeStatusAC({status: 'succeeded'}))
      return arg
    } catch (error) {
      thunkAPI.dispatch(changeStatusAC({status: 'failed'}))
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const todolistsReducer = todolistsSlice.reducer
export const { selectTodolist } = todolistsSlice.selectors
export const { changeFilterTodolistAC } = todolistsSlice.actions
