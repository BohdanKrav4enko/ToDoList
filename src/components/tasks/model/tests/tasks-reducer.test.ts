import { beforeEach, expect, test } from "vitest"
import { addTaskAC, changeTaskStatusAC, changeTitleTaskAC, removeTaskAC, tasksReducer } from "../tasks-reducer.ts"
import { TasksStateType } from "../../Tasks.tsx"

let startState: TasksStateType = {}

beforeEach(() => {
  startState = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  }
})

test("correct task should be added to correct array", () => {
  const startState = {
    todolist1: [],
  }
  const action = addTaskAC("todolist1", "New Task")
  const endState = tasksReducer(startState, action)

  // Проверяем, что задача была добавлена с правильным title
  expect(endState["todolist1"][0].title).toBe("New Task")
})

test("property with todolistId should be deleted", () => {
  const endState = tasksReducer(startState, removeTaskAC("todolistId2", "2"))

  expect(endState.todolistId2.length).toBe(2)
  expect(endState.todolistId2.some((t) => t.id === "2")).toBe(false)
})

test("проверка, что значения не равны ожидаемому", () => {
  expect(5).not.toBe(10)
  expect("hello").not.toContain("world")
})

test("correct task should be deleted", () => {
  const endState = tasksReducer(startState, removeTaskAC("todolistId2", "2"))

  expect(endState).toEqual({
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "3", title: "tea", isDone: false },
    ],
  })
})

test("correct task should be created at correct array", () => {
  const startState = {
    todolistId1: [
      { id: "1", title: "task 1", isDone: false },
      { id: "2", title: "task 2", isDone: true },
      { id: "3", title: "task 3", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "tea", isDone: false },
      { id: "2", title: "task 2", isDone: false },
      { id: "3", title: "task 3", isDone: true },
    ],
  }

  const endState = tasksReducer(startState, addTaskAC("todolistId2", "juice"))

  expect(endState.todolistId2.length).toBe(4)
  expect(endState.todolistId2[3].title).toBe("juice")
  expect(endState.todolistId2[3].isDone).toBe(false)
  expect(endState.todolistId2[3].id).toBeDefined()
})

test("проверка, что значение определено", () => {
  const value = "определено"
  expect(value).toBeDefined()
})

test("проверка, что значение не определено", () => {
  const value = undefined
  expect(value).toBeUndefined()
})

test("correct task should change its title", () => {
  const endState = tasksReducer(startState, changeTitleTaskAC("todolistId1", "TypeScript", "2"))

  expect(endState.todolistId1[1].title).toBe("TypeScript")
  expect(endState.todolistId1[1].isDone).toBe(true)
})
test("correct task should change its status", () => {
  const endState = tasksReducer(startState, changeTaskStatusAC("todolistId1", "2", false))

  expect(endState.todolistId1[1].isDone).toBe(false)
  expect(endState.todolistId1[1].title).toBe("JS")
})
