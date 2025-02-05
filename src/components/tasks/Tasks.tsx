import {Task} from "./task/Task.tsx";
import {useState} from "react";
import { v4 as uuidv4 } from 'uuid';

export type FilterValuesType = "all" | "completed" | "active"

export const Tasks = () => {
    const [tasks, setTasks] = useState(
        [
            {id: uuidv4(), title: 'CSS', isDone: true},
            {id: uuidv4(), title: 'HTML', isDone: false},
            {id: uuidv4(), title: 'JS', isDone: true},
            {id: uuidv4(), title: 'Redux', isDone: true},
        ]
    )
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const addTask = (title: string) => {
        const newTask = {id: uuidv4(), title: title, isDone: false};
        setTasks([newTask, ...tasks]);
    }

    const removeTask = (id: string) => {
        let filtredTasks = tasks.filter(t => t.id !== id)
        setTasks(filtredTasks);
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    }

    let taskForToDoList = tasks;
    if (filter === "completed") {
        taskForToDoList = tasks.filter(t => t.isDone);
    }
    if (filter === "active") {
        taskForToDoList = tasks.filter(t => !t.isDone);
    }

    return (
        <>
            <Task addTask={addTask} changeFilter={changeFilter} title="What to learn" tasks={taskForToDoList}
                  removeTask={removeTask}/>
            <Task addTask={addTask} changeFilter={changeFilter} title="list of movies" tasks={taskForToDoList}
                  removeTask={removeTask}/>
            <Task addTask={addTask} changeFilter={changeFilter} title="What to buy" tasks={taskForToDoList}
                  removeTask={removeTask}/>
            <Task addTask={addTask} changeFilter={changeFilter} title="Working notes" tasks={taskForToDoList}
                  removeTask={removeTask}/>
            <Task addTask={addTask} changeFilter={changeFilter} title="Music" tasks={taskForToDoList}
                  removeTask={removeTask}/>
        </>


    )
};

