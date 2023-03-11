import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';

import './styles/reset.css';
import './index.css';

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}
