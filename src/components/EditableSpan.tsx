import {ChangeEvent, KeyboardEvent, useState} from "react";
import {StyledItem, StyledTextField} from "./tasks/task/TaskStyles.tsx";
import React from 'react';

type EditableSpanPropsType = {
    title: string
    className?: string;
    viewTextField?: 'title' | 'task';
    onChange: (value: string) => void;
}
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    const [title, setTitle] = useState(props.title);
    const [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        if (title.trim().length > 0){
            props.onChange(title.trim())
        } else {
            props.onChange(props.title)
        }

    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            activateViewMode()
        }
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        ? <StyledTextField viewTextField={props.viewTextField} onKeyDown={onKeyDownHandler} value={title} onChange={onChangeTitleHandler}
                   onBlur={activateViewMode} id="standard-basic" variant="standard" multiline maxRows={4} size="small" fullWidth autoFocus />
        : <StyledItem onClick={activateEditMode} className={props.className}>{props.title}</StyledItem>
})

