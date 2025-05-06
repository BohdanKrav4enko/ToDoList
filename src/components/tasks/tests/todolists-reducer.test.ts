import { v1 } from "uuid"
import { expect, test } from "vitest"
import { FilterValuesType, TodolistType } from "../Todolists.tsx"
import {
  createTodolistAC,
  changeFilterTodolistAC,
  changeTitleTodolistAC,
  deleteTodolistAC,
  todolistsReducer,
} from "../../../store/todolists-slice.ts"

test("correct todolist should be deleted", () => {
  const todolistId1 = v1()
  const todolistId2 = v1()

  // 1. Стартовый state
  const startState: TodolistType[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]

  // 2. Действие
  // const action = {
  //     type: 'DELETE_TODOLIST' as const,
  //     payload: {
  //         id: todolistId1,
  //     },
  // }

  const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

  // 3. Проверка, что действие измененило state соответствующим образом
  // в массиве останется один тудулист
  expect(endState.length).toBe(1)
  // удалится нужный тудулист, не любой
  expect(endState[0].id).toBe(todolistId2)
})
test("correct todolist should be added", () => {
  const todolistId1 = v1()
  const todolistId2 = v1()
  const id = v1()

  const newTodoListTitle = "New To Do List"

  const startState: TodolistType[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]

  const endState = todolistsReducer(startState, createTodolistAC(id, newTodoListTitle))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(newTodoListTitle)
  expect(endState[2].filter).toBe("all")
})
test("correct todolist should change its name", () => {
  const todolistId1 = v1()
  const todolistId2 = v1()

  const newTodoListTitle = "New To Do List"

  const startState: TodolistType[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]

  const endState = todolistsReducer(startState, changeTitleTodolistAC(newTodoListTitle, todolistId2))

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(newTodoListTitle)
})
test("correct todolist should change title", () => {
  const todolistId1 = v1()
  const todolistId2 = v1()

  const newTodoListTitle = "New To Do List"

  const startState: TodolistType[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]

  const endState = todolistsReducer(startState, changeTitleTodolistAC(newTodoListTitle, todolistId2))

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(newTodoListTitle)
})
test("correct todolist should be change filter", () => {
  const todolistId1 = v1()
  const todolistId2 = v1()

  const newfilter: FilterValuesType = "all"

  const startState: TodolistType[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]

  const endState = todolistsReducer(startState, changeFilterTodolistAC(newfilter, todolistId2))

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(newfilter)
})
