import React from 'react';
import ReactDOM from 'react-dom/client';
import { MoralisProvider } from 'react-moralis';
import App from './components/App';
import 'bootstrap-icons/font/bootstrap-icons.scss';

const MoralisConfig = {
    serverUrl: 'https://iezkoxxnpvyt.usemoralis.com:2053/server',
    appId: 'H1nQLj6rsue5K122qnqLYtRTcjcEgB6YSWAJh1O1'
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MoralisProvider serverUrl={MoralisConfig.serverUrl} appId={MoralisConfig.appId}>
      <App />
    </MoralisProvider>
    <div className="position-static bottom-0 text-center fs-5 py-3">
      Powered by : <a href="https://moralis.io/" className="">Moralis</a>
    </div>
  </React.StrictMode>
);

