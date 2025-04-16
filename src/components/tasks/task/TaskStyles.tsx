import styled from "styled-components";
import {IconButton} from "@mui/material";
import TextField from "@mui/material/TextField";
import {EditableSpan} from "@/components/EditableSpan.tsx";
import {TaskStatus} from "@/api/todolists-api.ts";


type StyledIsDoneProps = {
    status?: TaskStatus;
    viewTextField?: 'title' | 'task';
}
export const StyledTitleIconButton = styled(IconButton)`
    opacity: 0;
`
export const StyledTaskIconButton = styled(IconButton)`
    opacity: 0;
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
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        ${StyledTitleIconButton} {
            opacity: 1;
        }  
    }
    ${StyledTitleIconButton} {
        transition: opacity 0.3s ease-in-out;
    }
`
export const TaskTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
        ${StyledTaskIconButton} {
            opacity: 1;
        }
    }
    ${StyledTaskIconButton} {
        transition: opacity 0.3s ease-in-out;
    }
}
`
export const StyledItem = styled.span`
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;

    &:hover {
        color: #0095bd;
        font-weight: bold;
    }
`
export const StyledTextField = styled(TextField)<StyledIsDoneProps>`
    & .MuiInputBase-root {
        line-height: 1.1;
        font-size: ${(props) => props.viewTextField === 'title' ? '30px' : '15px'}; 
        width: ${(props) => props.viewTextField === 'title' ? '280px' : '228px'};
        margin-bottom: ${(props) => props.viewTextField === 'title' ? '15px' : '0px'};;
        @media screen and (max-width: 410px) {
        width: ${(props) => props.viewTextField === 'title' ? '240px' : '182px'};
        }
    }
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
    opacity: ${props => (props.status ? 0.5 : 1)};
    font-size: 16px;
    margin-bottom: 20px;
    line-height: 20px;
`
export const StyledNoNotesText = styled.span`
    margin: 30px 0;
`


