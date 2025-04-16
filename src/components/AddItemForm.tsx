import {ChangeEvent, KeyboardEvent, useState} from "react";
import {StyledInputContainer} from "./tasks/task/TaskStyles.tsx";
import {IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import React from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void;
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState(false)

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== false) {
            setError(false)
        }
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addTask()
        }
    }
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)
    const addTask = () => {
        if (newTaskTitle.trim() === "") {
            setError(true)
            setNewTaskTitle('')
        } else {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle('');
        }
    }

    return <>
        <StyledInputContainer>
            <TextField
                onKeyDown={onKeyDownHandler} placeholder={'Enter text'}
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
                size="small"
                error={error}
                helperText={error && "Field is required"}
                fullWidth
            />
            <IconButton style={{transform: error ? 'translateY(-10px)' : 'translateY(0)'}} onClick={addTask}
                        aria-label="delete" size="small">
                <AddIcon color={error ? "error" : "primary"} fontSize="small"/>
            </IconButton>
        </StyledInputContainer>
    </>
})