import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';

const root = document.getElementById('root')!;
if (root.hasChildNodes() && root.querySelector('main')) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
