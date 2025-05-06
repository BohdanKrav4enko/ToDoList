import {
  StyledTitleContainer,
  StyledTitleEditableSpan,
  StyledTitleIconButton,
} from "@/components/tasks/task/taskStyles/TaskStyles.tsx"
import DeleteIcon from "@mui/icons-material/Delete"
import { useCallback } from "react"
import { TaskPropsType } from "@/components/tasks/task/Task.tsx"
import { useTodolistsLogic } from "@/common/hooks/useTodolistsLogic.ts"

export const TodolistTitle = (props: TaskPropsType) => {
  const { changeToDoListTitle, removeTodolist } = useTodolistsLogic()

  const changeToDoListTitleHandler = useCallback((title: string) => changeToDoListTitle(title, props.id), [changeToDoListTitle])
  const removeTodolistHandler = useCallback(() => removeTodolist(props.id), [removeTodolist])

  return (
    <StyledTitleContainer>
      <StyledTitleEditableSpan viewTextField={"title"} onChange={changeToDoListTitleHandler} title={props.title} />
      <StyledTitleIconButton onClick={removeTodolistHandler} aria-label="delete" size="small">
        <DeleteIcon color={"primary"} fontSize="small" />
      </StyledTitleIconButton>
    </StyledTitleContainer>
  )
}
