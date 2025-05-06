import { ButtonTask } from "@/components/buttonTask/ButtonTask.tsx"
import { StyledTaskFooter } from "@/components/tasks/task/taskStyles/TaskStyles.tsx"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { useCallback } from "react"
import { TaskPropsType } from "@/components/tasks/task/Task.tsx"
import { selectThemeMode } from "@/store/app-slice.ts"
import { useTodolistsLogic } from "@/common/hooks/useTodolistsLogic.ts"

export const FilterButtons = (props: TaskPropsType) => {
  const themeMode = useAppSelector(selectThemeMode)

  const { changeFilter } = useTodolistsLogic()

  const onAllCLickHandler = useCallback(() => changeFilter("all", props.id), [changeFilter])
  const onActiveCLickHandler = useCallback(() => changeFilter("active", props.id), [changeFilter])
  const onCompletedCLickHandler = useCallback(() => changeFilter("completed", props.id), [changeFilter])

  return (
    <StyledTaskFooter>
      <ButtonTask themeMode={themeMode} value={props.filter === "all"} onClick={onAllCLickHandler}>
        All
      </ButtonTask>
      <ButtonTask themeMode={themeMode} value={props.filter === "active"} onClick={onActiveCLickHandler}>
        Active
      </ButtonTask>
      <ButtonTask themeMode={themeMode} value={props.filter === "completed"} onClick={onCompletedCLickHandler}>
        Completed
      </ButtonTask>
    </StyledTaskFooter>
  )
}
