import styled from "styled-components";
import Photo from '../../assets/user.png'


export const Sidebar = () => {
    return (
        <StyledSidebar>
            <UserItem>
                <img src={Photo} alt="User photo"/>
                <p>Ivan Ivanov</p>
            </UserItem>
            <StyledSidebarButton>Search</StyledSidebarButton>
            <StyledSidebarButton>Calendar</StyledSidebarButton>
            <StyledSidebarButton>Today</StyledSidebarButton>
            <StyledSidebarButton>Upcoming</StyledSidebarButton>
            <StyledSidebarButton>Filters and tags</StyledSidebarButton>
        </StyledSidebar>
    );
};
const UserItem = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 50px;
img{
    width: 30px;
    height: 30px;
}
`
const StyledSidebar = styled.div`
    position: fixed;
    padding: 16px;
    top: 70px;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    max-width: 260px;
    width: 100%;
    background-color: rgb(239, 238, 238);
`
const StyledSidebarButton = styled.button`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
    padding: 5px;
    overflow: hidden;
    border-radius: 5px;
    border: none;
    height: 30px;
    transition: transform 0.2s ease, color 0.3s;
    background-color: rgba(255, 255, 255, 0.52);

    &:hover {
        cursor: pointer;
        color: rgb(5, 92, 163);
    }

    &:active {
        transform: scale(1.1);
    }

`
