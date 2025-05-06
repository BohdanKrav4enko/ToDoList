import { useAppDispatch } from "./useAppDispatch.ts"
import { changeTaskStatusTC, changeTaskTitleTC, createTasksTC, deleteTaskTC } from "@/store/tasks-slice.ts"
import { useCallback } from "react"
import { TaskStatus } from "@/api/tasksApi.types.ts"

export const useTaskLogic = (todolistId: string) => {
  const dispatch = useAppDispatch()

  const changeStatus = useCallback(
    (taskId: string, status: TaskStatus) => {
      dispatch(changeTaskStatusTC({ todolistId, id: taskId, status }))
    },
    [dispatch, todolistId],
  )

  const addTask = useCallback(
    (title: string) => {
      dispatch(createTasksTC({ todolistId, title }))
    },
    [dispatch, todolistId],
  )

  const changeTaskTitle = useCallback(
    (taskId: string, title: string) => {
      dispatch(changeTaskTitleTC({ todolistId, id: taskId,  title }))
    },
    [dispatch, todolistId],
  )

  const removeTask = useCallback(
    (id: string) => {
      dispatch(deleteTaskTC({ id, todolistId }))
    },
    [dispatch, todolistId],
  )



  return {
    changeStatus,
    addTask,
    changeTaskTitle,
    removeTask,
  }
}
