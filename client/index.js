import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import styles from './styles.css';
// import reset from './reset.css';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <FluentProvider theme={teamsLightTheme}>
      <App />
    </FluentProvider>
  </BrowserRouter>
);
