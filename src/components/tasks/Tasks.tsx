import {Task} from "./task/Task.tsx";
import {useReducer} from "react";
import {v4 as uuidv4} from 'uuid';
import {AddItemForm} from "../AddItemForm.tsx";
import {
    createTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    todolistsReducer, deleteTodolistAC
} from "./model/todolists-reducer.ts";
import {
    addTaskAC,
    addToodolistAC,
    changeTaskStatusAC,
    changeTitleTaskAC,
    removeTaskAC,
    tasksReducer
} from "./model/tasks-reducer.ts";

export type FilterValuesType = "all" | "completed" | "active"

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: TasksType[];
};
export const Tasks = () => {
        const todolistId1 = uuidv4()
        const todolistId2 = uuidv4()
        const todolistId3 = uuidv4()

        const [todolists, dispatchTodolists] = useReducer(todolistsReducer,
            [{id: todolistId1, title: 'What to learn', filter: "all"},
                {id: todolistId2, title: 'What to buy', filter: "all"},
                {id: todolistId3, title: 'Shopping List', filter: "all"}],
        )

        const [tasks, dispatchTask] = useReducer(tasksReducer,
            {
                [todolistId1]: [
                    {id: uuidv4(), title: 'CSS', isDone: true},
                    {id: uuidv4(), title: 'HTML', isDone: false},
                    {id: uuidv4(), title: 'JS', isDone: false},
                    {id: uuidv4(), title: 'Redux', isDone: false},
                ],
                [todolistId2]: [
                    {id: uuidv4(), title: 'Milk', isDone: true},
                    {id: uuidv4(), title: 'Snickers', isDone: false},
                    {id: uuidv4(), title: 'Book', isDone: true},
                    {id: uuidv4(), title: 'Brad', isDone: true},
                ],
                [todolistId3]: [
                    {id: uuidv4(), title: 'Apple', isDone: false},
                    {id: uuidv4(), title: 'Notebook', isDone: true},
                    {id: uuidv4(), title: 'Juice', isDone: false},
                    {id: uuidv4(), title: 'Headphones', isDone: true},
                    {id: uuidv4(), title: 'Backpack', isDone: false},
                    {id: uuidv4(), title: 'Pen', isDone: true}
                ]
            })


        const addTask = (title: string, todolistId: string) => {
            dispatchTask(addTaskAC(todolistId, title))
        }
        const removeTask = (id: string, todolistId: string) => {
            dispatchTask(removeTaskAC(id, todolistId))
        }
        const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
            dispatchTask(changeTitleTaskAC(todolistId, title, taskId))
        }
        const changeStatus = (taskId: string, todolistId: string, isDone: boolean) => {
            dispatchTask(changeTaskStatusAC(todolistId, taskId, isDone))
        }


        const changeToDoListTitle = (title: string, id: string) => {
            dispatchTodolists(changeTitleTodolistAC(title, id))
        }
        const changeFilter = (value: FilterValuesType, todolistId: string) => {
            dispatchTodolists(changeFilterTodolistAC(value, todolistId))
        }
        const removeTodolist = (todolistId: string) => {
            dispatchTodolists(deleteTodolistAC(todolistId))
        }
        const addTodoList = (title: string) => {
            const newId = uuidv4()
            dispatchTodolists(createTodolistAC(newId, title))
            dispatchTask(addToodolistAC(newId, title));
        }


        return <>
            <AddItemForm addItem={addTodoList}/>
            {todolists.map((tl) => {
                let taskForToDoList = tasks[tl.id];
                if (tl.filter === "completed") {
                    taskForToDoList = tasks[tl.id].filter(t => t.isDone);
                }
                if (tl.filter === "active") {
                    taskForToDoList = tasks[tl.id].filter(t => !t.isDone);
                }
                return <Task changeToDoListTitle={changeToDoListTitle} changeTaskTitle={changeTaskTitle}
                             removeTodolist={removeTodolist} id={tl.id} key={tl.id}
                             changeStatus={changeStatus}
                             addTask={addTask}
                             changeFilter={changeFilter} title={tl.title} tasks={taskForToDoList}
                             removeTask={removeTask} filter={tl.filter}/>
            })}

        </>
    }
;

