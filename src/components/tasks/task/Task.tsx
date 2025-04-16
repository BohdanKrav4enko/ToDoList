import {StyledNoNotesText, StyledNotes, TaskContainer,} from "./TaskStyles.tsx";
import React, {useCallback} from "react";
import {AddItemForm} from "../../AddItemForm.tsx";
import {Paper} from "@mui/material";
import {useTaskLogic} from "../common/hooks/useTaskLogic.ts";
import {TaskItems, TaskType} from "@/components/tasks/task/TasksItems.tsx";
import {FilterButtons} from "@/components/tasks/task/FilterButtons.tsx";
import {TodolistTitle} from "@/components/tasks/task/TodolistTitle.tsx";
import {FilterValuesType} from "@/components/tasks/model/todolists-reducer.ts";


export type TaskPropsType = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
    filter: FilterValuesType;
}
export const Task = React.memo((props: TaskPropsType) => {
    const {addTask} = useTaskLogic(props.id);

    const addTaskHandler = useCallback((title: string) => addTask(title), [addTask]);


    return (
        <StyledNotes>
            <Paper style={{padding: '30px', maxWidth: '376px', width: '100%'}} elevation={3}>
                <TaskContainer>
                    <TodolistTitle id={props.id} filter={props.filter} title={props.title} tasks={props.tasks}/>
                    <AddItemForm addItem={addTaskHandler}/>
                    {props.tasks.length === 0 ? (
                        <StyledNoNotesText>There are no notes here yet.</StyledNoNotesText>
                    ) : (
                        <TaskItems id={props.id} filter={props.filter} title={props.title} tasks={props.tasks}/>
                    )}
                    <FilterButtons id={props.id} filter={props.filter} title={props.title} tasks={props.tasks}/>
                </TaskContainer>
            </Paper>
        </StyledNotes>
    );
});

