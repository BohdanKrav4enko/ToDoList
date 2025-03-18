import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body{
        margin: 0;
        font-family: "Outfit", sans-serif;
        line-height: 1.2;
        min-height: 360px;
        min-width: 360px;
    }
    a {
        text-decoration: none;
    }

    a:visited {
        color: white;
    }
    ul {
        list-style: none;
    }
`