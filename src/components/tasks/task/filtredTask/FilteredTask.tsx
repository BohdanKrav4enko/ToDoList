import { TaskStatus } from "@/api/tasksApi.types.ts"
import { Task } from "@/components/tasks/task/Task.tsx"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { RootState } from "@/store/store.ts"
import { selectTodolist, TodolistDomainType } from "@/store/todolists-slice.ts"
import { selectTask, TasksStateType } from "@/store/tasks-slice.ts"

export const FilteredTask = () => {
  const todolists = useAppSelector<RootState, TodolistDomainType[]>(selectTodolist)
  const tasks = useAppSelector<RootState, TasksStateType>(selectTask)

  return <>
    {todolists.map((tl) => {
      let taskForToDoList = tasks[tl.id] ?? []
      if (tl.filter === "completed") {
        taskForToDoList = taskForToDoList.filter((t) => t.status === TaskStatus.Complete)
      }
      if (tl.filter === "active") {
        taskForToDoList = taskForToDoList.filter((t) => t.status === TaskStatus.New)
      }
      return <Task id={tl.id} key={tl.id} title={tl.title} tasks={taskForToDoList} filter={tl.filter} />
    })}
  </>
}

