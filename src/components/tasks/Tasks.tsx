import {Task} from "./task/Task.tsx";
import {AddItemForm} from "../AddItemForm.tsx";
import {createTodolistAC, TodolistDomainType} from "./model/todolists-reducer.ts";
import {addToodolistAC, TasksStateType} from "./model/tasks-reducer.ts";
import {RootState} from "@/store/store.ts";
import {useAppDispatch} from "./common/hooks/useAppDispatch.ts";
import {useAppSelector} from "./common/hooks/useAppSelector.ts";
import {nanoid} from "@reduxjs/toolkit";
import React, {useCallback} from "react";
import {TodolistCard} from "./task/TodolistCard.tsx";
import {StyledTextGreeting, StyledTodolistCardContainer} from "./task/AddTodolistCardStyles.tsx";
import {TaskStatus} from "@/api/todolists-api.ts";

export const Tasks = React.memo(() => {

    const dispatch = useAppDispatch();


    const todolists = useAppSelector<RootState, TodolistDomainType[]>(state => state.todolists)
    const tasks = useAppSelector<RootState, TasksStateType>(state => state.tasks)
    const addTodoList = useCallback((title: string) => {
        const newId = nanoid()
        dispatch(createTodolistAC(newId, title))
        dispatch(addToodolistAC({todolistId: newId, title}));
    }, [dispatch])

    return <>
        <AddItemForm addItem={addTodoList}/>
        <StyledTodolistCardContainer wrap={todolists.length > 0 ? 'wrap' : 'nowrap'}>
            <TodolistCard addItem={addTodoList}/>
            {todolists.length > 0
                ? null
                : <StyledTextGreeting>Welcome to Toodlist!</StyledTextGreeting>}
                {todolists.map((tl) => {
                    let taskForToDoList = tasks[tl.id];
                    if (tl.filter === "completed") {
                        taskForToDoList = taskForToDoList.filter(t => t.status === TaskStatus.Complete);
                    }
                    if (tl.filter === "active") {
                        taskForToDoList = taskForToDoList.filter(t => t.status === TaskStatus.New);
                    }
                    return <Task id={tl.id} key={tl.id} title={tl.title} tasks={taskForToDoList} filter={tl.filter}/>
                })}
        </StyledTodolistCardContainer>
    </>
})
