import { DomainTask, TaskStatus, UpdateTaskModel } from "@/api/tasksApi.types.ts"
import { createTodolistTC, deleteTodolistTC } from "@/store/todolists-slice.ts"
import { createAppSlice } from "@/common/utils/createAppSlice"
import { tasksApi } from "@/api/tasksApi.ts"
import { RootState } from "@/store/store.ts"
import { changeStatusAC } from "@/store/app-slice.ts"

export type TasksStateType = { [key: string]: DomainTask[] }

export const taskSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  selectors: {
    selectTask: state => state
  },
  reducers: create => ({
    fetchTasksTC: create.asyncThunk(
      async (todolistId: string, thunkAPI) => {
        try {
          thunkAPI.dispatch(changeStatusAC({status: 'loading'}))
          const res = await tasksApi.getTasks(todolistId)
          thunkAPI.dispatch(changeStatusAC({status: 'succeeded'}))
          return { todolistId, tasks: res.data.items }
        } catch (error) {
          thunkAPI.dispatch(changeStatusAC({status: 'failed'}))
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        }
      }
    ),
    createTasksTC: create.asyncThunk(
      async (arg: { todolistId: string; title: string }, thunkAPI) => {
        try {
          thunkAPI.dispatch(changeStatusAC({status: 'loading'}))
          const {title, todolistId} = arg
          const res = await tasksApi.createTask(todolistId, title)
          thunkAPI.dispatch(changeStatusAC({status: 'succeeded'}))
          return { todolistId: arg.todolistId, task: res.data.data.item }
        } catch (error) {
          thunkAPI.dispatch(changeStatusAC({status: 'failed'}))
          return thunkAPI.rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId].unshift(action.payload.task)
        }
      }
    ),
    deleteTaskTC: create.asyncThunk(
      async (arg: { id: string; todolistId: string }, thunkAPI) => {
        try {
          thunkAPI.dispatch(changeStatusAC({status: 'loading'}))
          const {id ,todolistId} = arg
          await tasksApi.deleteTask(todolistId, id)
          thunkAPI.dispatch(changeStatusAC({status: 'succeeded'}))
          return arg
        } catch (error) {
          thunkAPI.dispatch(changeStatusAC({status: 'failed'}))
          return thunkAPI.rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const tasks = state[action.payload.todolistId]
          const index = tasks.findIndex((task) => task.id === action.payload.id)
          if (index !== -1) {
            tasks.splice(index, 1)
          }
        }
      }
    ),
    changeTaskTitleTC: create.asyncThunk(
      async (arg: { todolistId: string; id: string; title: string; }, thunkAPI) => {
        try {
          thunkAPI.dispatch(changeStatusAC({status: 'loading'}))
          const {title, id ,todolistId} = arg
          const tasks = (thunkAPI.getState() as RootState).tasks
          const task = tasks[todolistId].find(t => t.id === id)

          if (!task) {
            return thunkAPI.rejectWithValue(null)
          }

          const model: UpdateTaskModel = {
            title: title,
            status: task.status,
            description: task.description,
            deadline: task.deadline,
            startDate: task.startDate,
            priority: task.priority,
          }
          const res = await tasksApi.changeTask(todolistId, id, model)
          thunkAPI.dispatch(changeStatusAC({status: 'succeeded'}))
          return {task: res.data.data.item}
        } catch (error) {
          thunkAPI.dispatch(changeStatusAC({status: 'failed'}))
          return thunkAPI.rejectWithValue(error)

        }
      },
      {
        fulfilled: (state, action) => {
          const { todoListId, title, id } = action.payload.task
          if (state[todoListId]) {
            const task = state[todoListId].find((task) => task.id === id)
            if (task) {
              task.title = title
            }
          }
        }
      }
    ),
    changeTaskStatusTC: create.asyncThunk(
      async (arg: { todolistId: string; id: string; status: TaskStatus; }, thunkAPI) => {
        try {
          thunkAPI.dispatch(changeStatusAC({status: 'loading'}))
          const {status, id ,todolistId} = arg
          const tasks = (thunkAPI.getState() as RootState).tasks
          const task = tasks[todolistId].find(t => t.id === id)

          if (!task) {
            return thunkAPI.rejectWithValue(null)
          }

          const model: UpdateTaskModel = {
            title: task.title,
            status: status,
            description: task.description,
            deadline: task.deadline,
            startDate: task.startDate,
            priority: task.priority,
          }
          const res = await tasksApi.changeTask(todolistId, id, model)
          thunkAPI.dispatch(changeStatusAC({status: 'succeeded'}))
          return {task: res.data.data.item}
        } catch (error) {
          thunkAPI.dispatch(changeStatusAC({status: 'failed'}))
          return thunkAPI.rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const { todoListId, status, id } = action.payload.task
          if (state[todoListId]) {
            const task = state[todoListId].find((task) => task.id === id)
            if (task) {
              task.status = status
            }
          }
        }
      }
    ),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        const { id } = action.payload.todolist
        state[id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        const { id } = action.payload
        delete state[id]
      })
  }

})

export const tasksReducer = taskSlice.reducer
export const { fetchTasksTC, createTasksTC, deleteTaskTC, changeTaskTitleTC, changeTaskStatusTC } = taskSlice.actions
export const { selectTask } = taskSlice.selectors