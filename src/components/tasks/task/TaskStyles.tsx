import styled from "styled-components";
export const StyledNotes = styled.div`
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    padding: 30px;
    max-width: 200px;
    width: 100%;

    li {
        list-style: none;
        margin: 10px 0;
    }

    ul {
        padding: 0;
    }
`
export const TaskContainer = styled.div`
    display: flex;
    flex-direction: column;

`
export const StyledInput = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 10px;
`
export const StyledList = styled.ul`

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
