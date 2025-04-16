import {
    StyledTitleContainer,
    StyledTitleEditableSpan,
    StyledTitleIconButton
} from "@/components/tasks/task/TaskStyles.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import {useCallback} from "react";
import {useTaskLogic} from "@/components/tasks/common/hooks/useTaskLogic.ts";
import {TaskPropsType} from "@/components/tasks/task/Task.tsx";

export const TodolistTitle = (props: TaskPropsType) => {
    const {changeToDoListTitle, removeTodolist,} = useTaskLogic(props.id);

    const changeToDoListTitleHandler = useCallback((title: string) => changeToDoListTitle(title), [changeToDoListTitle]);
    const removeTodolistHandler = useCallback(() => removeTodolist(), [removeTodolist]);

    return (
        <StyledTitleContainer>
            <StyledTitleEditableSpan viewTextField={'title'} onChange={changeToDoListTitleHandler}
                                     title={props.title}/>
            <StyledTitleIconButton onClick={removeTodolistHandler} aria-label="delete" size="small">
                <DeleteIcon color={"primary"} fontSize="small"/>
            </StyledTitleIconButton>
        </StyledTitleContainer>
    );
};

