import styled from "styled-components";

type ButtonTaskProps = {
    backgroundColor: string
}

export const ButtonTask = styled.button<ButtonTaskProps>`
    background-color: ${(props) => props.backgroundColor};
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100px;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 5px;
`