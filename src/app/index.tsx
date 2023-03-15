/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { ChatPage } from './pages/Chat/Loadable';

export function App() {
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="TurboGPT | A better UI for ChatGPT"
        defaultTitle="TurboGPT"
      >
        <meta name="description" content="TurboGPT" />
      </Helmet>

      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
