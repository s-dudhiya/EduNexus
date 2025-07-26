import { createRoot } from 'react-dom/client'
import App from './App.jsx' // Changed from .tsx to .jsx
import './index.css'

// Removed the '!' non-null assertion which is a TypeScript feature
createRoot(document.getElementById("root")).render(<App />);