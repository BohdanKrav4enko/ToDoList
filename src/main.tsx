import {createRoot} from 'react-dom/client'
import {App} from "./App.tsx";
import './styled.css';
import {GlobalStyle} from "./style/GlobalStyle.tsx";

createRoot(document.getElementById('root')!).render(
    <>
        <GlobalStyle/>
        <App/>
    </>
)
