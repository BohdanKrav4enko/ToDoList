import { StyledNoNotesText, StyledNotes, TaskContainer } from "./taskStyles/TaskStyles.tsx"
import React, { useCallback, useEffect } from "react"
import { AddItemForm } from "../../addItemForm/AddItemForm.tsx"
import { Paper } from "@mui/material"
import { useTaskLogic } from "@/common/hooks/useTaskLogic.ts"
import { TaskItems, TaskType } from "@/components/tasks/task/taskItem/TasksItems.tsx"
import { FilterButtons } from "@/components/tasks/task/filterButtons/FilterButtons.tsx"
import { TodolistTitle } from "@/components/tasks/task/todolistTitile/TodolistTitle.tsx"
import { FilterValuesType } from "@/store/todolists-slice.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { fetchTasksTC } from "@/store/tasks-slice.ts"

export type TaskPropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
}
export const Task = React.memo((props: TaskPropsType) => {
  const { addTask } = useTaskLogic(props.id)
  const dispatch = useAppDispatch()

  const addTaskHandler = useCallback((title: string) => addTask(title), [addTask])

  useEffect(() => {
    dispatch(fetchTasksTC(props.id))
  }, [])

  return (
    <StyledNotes>
      <Paper style={{ padding: "30px", maxWidth: "376px", width: "100%" }} elevation={3}>
        <TaskContainer>
          <TodolistTitle id={props.id} filter={props.filter} title={props.title} tasks={props.tasks} />
          <AddItemForm addItem={addTaskHandler} />
          {props.tasks?.length === 0 ? (
            <StyledNoNotesText>There are no notes here yet.</StyledNoNotesText>
          ) : (
            <TaskItems id={props.id} filter={props.filter} title={props.title} tasks={props.tasks} />
          )}
          <FilterButtons id={props.id} filter={props.filter} title={props.title} tasks={props.tasks} />
        </TaskContainer>
      </Paper>
    </StyledNotes>
  )
})
