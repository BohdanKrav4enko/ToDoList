import { useCallback } from "react"
import {
  changeFilterTodolistAC, changeTodolistsTitleTC, createTodolistTC, deleteTodolistTC, FilterValuesType
} from "@/store/todolists-slice.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"

export const useTodolistsLogic = () => {
  const dispatch = useAppDispatch()

  const changeToDoListTitle = useCallback((title: string, todolistId: string) => {
      dispatch(changeTodolistsTitleTC({ title, id: todolistId }))},
    [dispatch]
  )
  const removeTodolist = useCallback((todolistId: string) => {
      dispatch(deleteTodolistTC(todolistId))},
    [dispatch]
  )

  const addTodoList = useCallback((title: string) => {
      dispatch(createTodolistTC(title))},
    [dispatch]
  )
  const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
      dispatch(changeFilterTodolistAC({ filter: value, id: todolistId }))},
    [dispatch]
  )

  return {
    changeFilter,
    addTodoList,
    removeTodolist,
    changeToDoListTitle,
  }
}