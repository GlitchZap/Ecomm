import React from 'react';
import ReactDOM from 'react-dom/client'; // <-- NOTICE this change!
import './index.css';
import App from './App';


// Importing TailwindCSS and other styles
import './tailwind.css';

// ✅ New React 18 style
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    
      <App />
    
  </React.StrictMode>
);
