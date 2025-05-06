import styled from "styled-components"
import { Checkbox } from "@mui/material"
import { StyledTitleEditableNotesSpan } from "@/components/tasks/task/taskStyles/TaskStyles.tsx"
import { ChangeEvent } from "react"
import { TaskStatus } from "@/api/tasksApi.types.ts"

type TaskItemType = {
  id: string
  title: string
  status: TaskStatus
  onChangeStatusHandler: (e: ChangeEvent<HTMLInputElement>) => void
  onChangeTitleHandler: (value: string) => void
}

export const TaskItem = (props: TaskItemType) => {
  return (
    <StyledTaskItem key={props.id}>
      <Checkbox onChange={props.onChangeStatusHandler} checked={props.status === TaskStatus.Complete} />
      <div>
        <StyledTitleEditableNotesSpan
          viewTextField={"task"}
          status={props.status}
          onChange={props.onChangeTitleHandler}
          title={props.title}
        />
      </div>
    </StyledTaskItem>
  )
}

export const StyledTaskItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  margin: 5px 0;
`
