import styled from "styled-components";
import {EditableSpan} from "../../EditableSpan.tsx";

type StyledInputType = {
    color: string;
}
type StyledIsDoneProps = {
    opacity: number;
}

export const StyledNotes = styled.div`
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    padding: 30px;
    max-width: 200px;
    width: 100%;



    ul {
        padding: 0;
    }
`
export const TaskContainer = styled.div`
    display: flex;
    flex-direction: column;

`
export const StyledInputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 10px;
`
export const StyledList = styled.ul`
`
export const TaskItem  = styled.li<StyledIsDoneProps>`
    list-style: none;
    margin: 10px 0;
    opacity: ${props => (props.opacity)};

`
export const TaskTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const TaskTitleButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 20px;
    max-height: 20px;
    width: 100%;
    height: 100%;
`
export const StyledTaskFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0 10px;
`
export const StyledErrorText = styled.p`
    color: red;
`
export const StyledInput = styled.input<StyledInputType>`
     border-color: ${props => props.color};
`
export const StyledTitleContainer = styled.div`
    display: flex;
    align-items: start;
    justify-content: space-between;
`
export const StyledTitleEditableSpan = styled(EditableSpan)`
    font-size: 30px;
    margin-bottom: 20px;
`