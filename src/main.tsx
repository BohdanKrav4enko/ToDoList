import { createRoot } from 'react-dom/client'
import {App} from "./App.tsx";
import './styled.css';

createRoot(document.getElementById('root')!).render(
    <App />
)
