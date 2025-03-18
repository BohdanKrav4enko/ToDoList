import {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import {StyledItem} from "./tasks/task/TaskStyles.tsx";

type EditableSpanPropsType = {
    title: string
    className?: string;
    onChange: (value: string) => void;
}
export const EditableSpan = (props: EditableSpanPropsType) => {

    const [title, setTitle] = useState(props.title);
    const [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title.trim())
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            activateViewMode()
        }
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        ? <TextField onKeyDown={onKeyDownHandler} value={title} onChange={onChangeTitleHandler}
                   onBlur={activateViewMode} id="standard-basic" variant="standard" multiline maxRows={4} size="small" fullWidth autoFocus />
        : <StyledItem onDoubleClick={activateEditMode} className={props.className}>{props.title}</StyledItem>
}

