import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const CHUNK_RELOAD_KEY = 'nws_chunk_reload_once';

const reloadOnceForChunkError = () => {
  if (sessionStorage.getItem(CHUNK_RELOAD_KEY) === '1') return;
  sessionStorage.setItem(CHUNK_RELOAD_KEY, '1');
  window.location.reload();
};

window.addEventListener('error', (event) => {
  const message = String((event as ErrorEvent).message || '');
  if (message.includes('ChunkLoadError') || message.includes('Loading chunk')) {
    reloadOnceForChunkError();
  }
});

window.addEventListener('unhandledrejection', (event) => {
  const reason = (event as PromiseRejectionEvent).reason;
  const message = String(reason?.message || reason || '');
  if (message.includes('ChunkLoadError') || message.includes('Loading chunk')) {
    reloadOnceForChunkError();
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
