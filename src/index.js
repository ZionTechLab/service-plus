import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
// import './themes.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <HashRouter> <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode></HashRouter>
);

reportWebVitals();
