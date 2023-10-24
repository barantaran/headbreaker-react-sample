import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import styles from './App.styles';

// import reportWebVitals from './reportWebVitals';

// const shadowRoot = document.querySelector('body').attachShadow({ mode: "open" });

ReactDOM.createRoot(
  document
  .getElementById('gameroot')
  .attachShadow({ mode: "open" }))
  .render(
  <React.StrictMode>
    <style>{styles}</style>
    <App />
  </React.StrictMode>
);

// gameRoot.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
