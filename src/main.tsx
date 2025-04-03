import {createRoot} from 'react-dom/client'
import {App} from "./App.tsx";
import './styled.css';
import {GlobalStyle} from "./style/GlobalStyle.tsx";
import {Provider} from "react-redux";
import {store} from "./components/tasks/model/store.ts";

createRoot(document.getElementById('root')!).render(
    <>
        <GlobalStyle/>
        <Provider store={store}>
        <App/>
        </Provider>
    </>
)
