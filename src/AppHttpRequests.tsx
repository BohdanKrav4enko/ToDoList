import { ChangeEvent, CSSProperties, useEffect, useState } from "react"
import { todolistsApi } from "@/api/todolists-api.ts"
import { TodolistType } from "@/api/todolistApi.types.ts"
import { DomainTask, TaskStatus, UpdateTaskModel } from "@/api/tasksApi.types.ts"
import { tasksApi } from "@/api/tasksApi.ts"
import { AddItemForm } from "@/components/AddItemForm.tsx"
import { Checkbox } from "@mui/material"
import { StyledTitleEditableNotesSpan } from "@/components/tasks/task/TaskStyles.tsx"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<TodolistType[]>([])
  const [tasks, setTasks] = useState<Record<string, DomainTask[]>>({})

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data
      setTodolists(todolists)
      todolists.forEach((todolist) => {
        tasksApi.getTasks(todolist.id).then((res) => {
          setTasks((prevTasks) => ({ ...prevTasks, [todolist.id]: res.data.items }))
        })
      })
    })
  }, [])

  const createTodolist = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      const newTodolist = res.data.data.item
      setTodolists((prev) => [newTodolist, ...prev])
    })
  }
  const deleteTodolist = (id: string) => {
    todolistsApi.deleteTodolist(id).then(() => {
      setTodolists((prev) => prev.filter((todolist) => todolist.id !== id))
    })
  }
  const changeTodolistTitle = (id: string, title: string) => {
    todolistsApi.changeTodolistTitle({ id, title }).then(() => {
      setTodolists((prev) => prev.map((todolist) => (todolist.id === id ? { ...todolist, title } : todolist)))
    })
  }

  const createTask = (todolistId: string, title: string) => {
    tasksApi.createTask(todolistId, title).then((res) => {
      setTasks((prev) => ({
        ...prev,
        [todolistId]: [res.data.data.item, ...(prev[todolistId] || [])],
      }))
    })
  }
  const deleteTask = (todolistId: string, taskId: string) => {
    tasksApi.deleteTask(todolistId, taskId).then(() => {
      setTasks((prev) => ({
        ...prev,
        [todolistId]: prev[todolistId].filter((task) => task.id !== taskId),
      }))
    })
  }
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
    const model: UpdateTaskModel = {
      status: e.target.checked ? TaskStatus.Complete : TaskStatus.New,
      title: task.title,
      priority: task.priority,
      startDate: task.startDate,
      description: task.description,
      deadline: task.deadline,
    }
    tasksApi.changeTask(task.todoListId, task.id, model).then((res) => {
      setTasks((prev) => ({
        ...prev,
        [task.todoListId]: prev[task.todoListId].map((el) => (el.id === task.id ? res.data.data.item : el)),
      }))
    })
  }
  const changeTaskTitle = (title: string, task: DomainTask) => {
    const model: UpdateTaskModel = {
      status: task.status,
      title: title,
      priority: task.priority,
      startDate: task.startDate,
      description: task.description,
      deadline: task.deadline,
    }
    tasksApi.changeTask(task.todoListId, task.id, model).then((res) => {
      setTasks((prev) => ({
        ...prev,
        [task.todoListId]: prev[task.todoListId].map((el) => (el.id === task.id ? res.data.data.item : el)),
      }))
    })
  }

  return (
    <div style={{ margin: "20px" }}>
      <AddItemForm addItem={createTodolist} />
      {todolists.map((todolist) => (
        <div key={todolist.id} style={container}>
          <div>
            <StyledTitleEditableNotesSpan
              title={todolist.title}
              onChange={(title) => changeTodolistTitle(todolist.id, title)}
            />
            <button onClick={() => deleteTodolist(todolist.id)}>x</button>
          </div>
          <AddItemForm addItem={(title) => createTask(todolist.id, title)} />
          {tasks[todolist.id]?.map((task: any) => (
            <div key={task.id}>
              <Checkbox checked={task.status === TaskStatus.Complete} onChange={(e) => changeTaskStatus(e, task)} />
              <StyledTitleEditableNotesSpan title={task.title} onChange={(title) => changeTaskTitle(title, task)} />
              <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const container: CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "330px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
