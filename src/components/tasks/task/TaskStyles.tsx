import styled from "styled-components";
import {EditableSpan} from "../../EditableSpan.tsx";
import {IconButton} from "@mui/material";


type StyledIsDoneProps = {
    isDone?: boolean;
}
export const StyledTitleIconButton = styled(IconButton)`
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
`
export const StyledTaskIconButton = styled(IconButton)`
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
`
export const StyledNotes = styled.div`
    display: flex;
    max-width: 376px;
    width: 100%;
    height: 500px;
    ul {
        padding: 0;
    }
    &:hover{
        ${StyledTitleIconButton} {
            opacity: 1;
            transition: opacity 0.3s ease-in-out;

        }  
    } 
`
export const StyledItem = styled.span`
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
`
export const TaskContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
    height: 100%;
    flex: 1;
    
`
export const StyledInputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 0 10px;
    min-height: 80px;
`
export const StyledList = styled.ul`
    margin: 10px 0;
    overflow-y: auto;
`
export const TaskItem  = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    list-style: none;
    margin: 10px 0;
    
`
export const TaskTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
        ${StyledTaskIconButton} {
            opacity: 1;
            transition: opacity 0.3s ease-in-out;
        }
    }
}
`
export const StyledTaskFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0 10px;
    margin-top: auto;
`

export const StyledTitleContainer = styled.div`
    display: flex;
    align-items: start;
    justify-content: space-between;
`
export const StyledTitleEditableSpan = styled(EditableSpan)`
    font-size: 30px;
    margin-bottom: 20px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
`
export const StyledTitleEditableNotesSpan = styled(EditableSpan)<StyledIsDoneProps>`
    opacity: ${props => (props.isDone ? 0.5 : 1)};
    font-size: 16px;
    margin-bottom: 20px;
    line-height: 20px;
`
export const StyledNoNotesText = styled.span`
    margin: 30px 0;
`


