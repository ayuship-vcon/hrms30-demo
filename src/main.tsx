import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@/styles/globals.css';
import { initializeMsal, msalInstance } from '@/core/auth';

async function bootstrap() {
  // Popup Window
  const hash = typeof window !== 'undefined' ? window.location.hash : '';
  const search = typeof window !== 'undefined' ? window.location.search : '';
  const winName = typeof window !== 'undefined' ? window.name : '';

  const hasOAuthResponseParams =
    hash.includes('error=') ||
    hash.includes('code=') ||
    hash.includes('id_token=') ||
    hash.includes('access_token=') ||
    search.includes('error=') ||
    search.includes('code=');

  const isPopupWindow =
    typeof window !== 'undefined' &&
    (Boolean(window.opener && window.opener !== window) ||
      winName.includes('msal.') ||
      winName.includes('popup') ||
      hasOAuthResponseParams);

  if (isPopupWindow) {
    try {
      await initializeMsal();
      await msalInstance.handleRedirectPromise();
    } catch (e) {
      console.warn('[MSAL Popup Handler]:', e);
    }
    // Immediately close the popup window
    window.close();
    return;
  }

  // Normal Main Application Window
  await initializeMsal();

  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Failed to find root element');

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

bootstrap();
