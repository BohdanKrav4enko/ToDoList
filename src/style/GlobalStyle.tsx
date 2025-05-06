import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle<{ themeMode: "light" | "dark" }>`
    *,
    *::before,
    *::after{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body{
        margin: 0;
        padding: 0;
        background-color: ${({ themeMode }) => (themeMode === "dark" ? "#121212" : "#f5f5f5")};
        color: ${({ themeMode }) => (themeMode === "dark" ? "#fff" : "#000")};
        transition: background-color 0.3s ease, color 0.3s ease;
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
