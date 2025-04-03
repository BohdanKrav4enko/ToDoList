import {Task} from "./task/Task.tsx";
import {AddItemForm} from "../AddItemForm.tsx";
import {
    createTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC, deleteTodolistAC
} from "./model/todolists-reducer.ts";
import {
    addTaskAC,
    addToodolistAC,
    changeTaskStatusAC,
    changeTitleTaskAC,
    removeTaskAC,
} from "./model/tasks-reducer.ts";
import {RootState} from "./model/store.ts";
import {useAppDispatch} from "./common/hooks/useAppDispatch.ts";
import {useAppSelector} from "./common/hooks/useAppSelector.ts";
import {nanoid} from "@reduxjs/toolkit";

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

        const dispatch = useAppDispatch();

        const todolists = useAppSelector<RootState, TodolistType[]>(state => state.todolists)
        const tasks = useAppSelector<RootState, TasksStateType>(state => state.tasks)


        const addTask = (title: string, todolistId: string) => {
            dispatch(addTaskAC({todolistId, title}))
        }
        const removeTask = (id: string, todolistId: string) => {
            dispatch(removeTaskAC({id, todolistId}))
        }
        const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
            dispatch(changeTitleTaskAC({todolistId, title,id: taskId}))
        }
        const changeStatus = (taskId: string, todolistId: string, isDone: boolean) => {
            dispatch(changeTaskStatusAC({todolistId, id: taskId, isDone}))
        }
        const changeToDoListTitle = (title: string, id: string) => {
            dispatch(changeTitleTodolistAC({title, id}))
        }
        const changeFilter = (value: FilterValuesType, todolistId: string) => {
            dispatch(changeFilterTodolistAC({filter: value, id: todolistId}))
        }
        const removeTodolist = (todolistId: string) => {
            dispatch(deleteTodolistAC({id: todolistId}))
        }
        const addTodoList = (title: string) => {
            const newId = nanoid()
            dispatch(createTodolistAC(newId, title))
            dispatch(addToodolistAC({todolistId: newId, title}));
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

