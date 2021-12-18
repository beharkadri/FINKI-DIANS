import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { firebase } from './lib/firebase.prod';
import { FirebaseContext } from './context/firebase';
import { AuthContextProvider } from './context/auth-context';

ReactDOM.render(
  <AuthContextProvider>
    <FirebaseContext.Provider value={{ firebase }}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </FirebaseContext.Provider>
  </AuthContextProvider>,
  document.getElementById('root')
);
