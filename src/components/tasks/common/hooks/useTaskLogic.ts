import { useAppDispatch } from "./useAppDispatch.ts"
import { addTaskAC, changeTaskStatusAC, changeTitleTaskAC, removeTaskAC } from "../../model/tasks-reducer.ts"
import {
  changeFilterTodolistAC,
  changeTitleTodolistAC,
  deleteTodolistAC,
  FilterValuesType,
} from "../../model/todolists-reducer.ts"
import { useCallback } from "react"
import { TaskStatus } from "@/api/todolists-api.ts"

export const useTaskLogic = (todolistId: string) => {
  const dispatch = useAppDispatch()

  const changeStatus = useCallback(
    (taskId: string, status: TaskStatus) => {
      dispatch(changeTaskStatusAC({ todolistId, id: taskId, status }))
    },
    [dispatch, todolistId],
  )

  const changeToDoListTitle = useCallback(
    (title: string) => {
      dispatch(changeTitleTodolistAC({ title, id: todolistId }))
    },
    [dispatch, todolistId],
  )

  const removeTodolist = useCallback(() => {
    dispatch(deleteTodolistAC({ id: todolistId }))
  }, [dispatch, todolistId])

  const addTask = useCallback(
    (title: string) => {
      dispatch(addTaskAC({ todolistId, title }))
    },
    [dispatch, todolistId],
  )

  const changeTaskTitle = useCallback(
    (taskId: string, title: string) => {
      dispatch(changeTitleTaskAC({ todolistId, title, id: taskId }))
    },
    [dispatch, todolistId],
  )

  const removeTask = useCallback(
    (id: string) => {
      dispatch(removeTaskAC({ id, todolistId }))
    },
    [dispatch, todolistId],
  )

  const changeFilter = useCallback(
    (value: FilterValuesType) => {
      dispatch(changeFilterTodolistAC({ filter: value, id: todolistId }))
    },
    [dispatch, todolistId],
  )

  return {
    changeStatus,
    changeToDoListTitle,
    removeTodolist,
    addTask,
    changeTaskTitle,
    removeTask,
    changeFilter,
  }
}
