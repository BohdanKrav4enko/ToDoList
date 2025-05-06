import { StyledList, StyledTaskIconButton, TaskTitle } from "@/components/tasks/task/taskStyles/TaskStyles.tsx"
import DeleteIcon from "@mui/icons-material/Delete"
import { useTaskLogic } from "@/common/hooks/useTaskLogic.ts"
import { TaskPropsType } from "@/components/tasks/task/Task.tsx"
import { ChangeEvent } from "react"
import { TaskItem } from "@/components/tasks/task/taskItem/TaskItem.tsx"
import { TaskStatus } from "@/api/tasksApi.types.ts"

export type TaskType = {
  id: string
  title: string
  status: TaskStatus
}

export const TaskItems = (props: TaskPropsType) => {
  const { removeTask, changeStatus, changeTaskTitle } = useTaskLogic(props.id)

  return (
    <StyledList>
      {props.tasks?.map((t: TaskType) => {
        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
          const newIdDoneValue = e.currentTarget.checked
          changeStatus(t.id, newIdDoneValue ? TaskStatus.Complete : TaskStatus.New)
        }
        const onChangeTitleHandler = (value: string) => {
          changeTaskTitle(t.id, value)
        }
        const onClickHandler = () => removeTask(t.id)
        return (
          <TaskTitle>
            <TaskItem
              onChangeTitleHandler={onChangeTitleHandler}
              onChangeStatusHandler={onChangeStatusHandler}
              id={t.id}
              title={t.title}
              status={t.status}
            />
            <StyledTaskIconButton onClick={onClickHandler} aria-label="delete" size="small">
              <DeleteIcon color={"primary"} fontSize="small" />
            </StyledTaskIconButton>
          </TaskTitle>
        )
      })}
    </StyledList>
  )
}
