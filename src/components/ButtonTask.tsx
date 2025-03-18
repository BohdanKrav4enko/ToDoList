import styled from "styled-components";

type ButtonTaskProps = {
    value: boolean
}

export const ButtonTask = styled.button<ButtonTaskProps>`
    background-color: ${(props) => props.value ? '#0066CC' : '#ffffff'};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    max-width: 78px;
    width: 100%;
    border: none;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 600;
    color: ${(props) => props.value ? '#FFFFFF' : 'black'};
    transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.1s ease;

    &:focus {
        outline: none;
        background-color: #0055AA;
        box-shadow: 0 0 5px rgba(0, 102, 204, 0.5);
    }
    &:active {
        background-color: #004499;
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.2);
        transform: scale(0.95);
    }
    &:hover {
        background-color: ${(props) => (props.value ? '#0077DD' : '#f0f0f0')};
        box-shadow: 0 2px 5px rgba(0, 102, 204, 0.3);
    }
`