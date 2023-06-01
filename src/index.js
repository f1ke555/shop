import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {firebaseConfig} from "./const/api.const";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app)

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Context.Provider value={{
          app,
          auth,
          database
      }}>
          <App />
      </Context.Provider>
  </React.StrictMode>
);

