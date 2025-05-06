import { AddItemForm } from "../addItemForm/AddItemForm.tsx"
import { fetchTodolistsTC, selectTodolist, TodolistDomainType } from "@/store/todolists-slice.ts"
import { RootState } from "@/store/store.ts"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { TodolistCard } from "./task/todolistCard/TodolistCard.tsx"
import { StyledTextGreeting, StyledTodolistCardContainer } from "./task/taskStyles/AddTodolistCardStyles.tsx"
import React, { useEffect } from "react"
import { useTodolistsLogic } from "@/common/hooks/useTodolistsLogic.ts"
import { FilteredTask } from "@/components/tasks/task/filtredTask/FilteredTask.tsx"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"

export const Todolists = React.memo(() => {
  const dispatch = useAppDispatch()
  const todolists = useAppSelector<RootState, TodolistDomainType[]>(selectTodolist)
  const {addTodoList} = useTodolistsLogic()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
}, [])

  return (
    <>
      <AddItemForm addItem={addTodoList} />
      <StyledTodolistCardContainer wrap={todolists.length > 0 ? "wrap" : "nowrap"}>
        <TodolistCard addItem={addTodoList} />
        {todolists.length > 0 ? null : <StyledTextGreeting>Welcome to Toodlist!</StyledTextGreeting>}
      <FilteredTask/>
      </StyledTodolistCardContainer>
    </>
  )
})
