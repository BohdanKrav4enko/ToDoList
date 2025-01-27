import styled from "styled-components";

export const Notes = () => {
    return (
        <StyledNotes>
            <h1>Notes</h1>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                <li><input type={"checkbox"} checked={true}/>CSS</li>
                <li><input type={"checkbox"} checked={true}/>JS</li>
                <li><input type={"checkbox"} checked={false}/>HTML</li>
            </ul>
        </StyledNotes>
    );
};

const StyledNotes = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px;
`