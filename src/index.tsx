import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import { Provider } from 'react-redux';
import { store } from './store/store';

import './styles/reset.css';
import './index.css';

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}
