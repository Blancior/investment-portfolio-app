//pliki od bazy danych(const = ...),api tutaj
import {initializeApp} from 'firebase/app';

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyBOFRAE8r7BkefAWDh3wyyflsJO_IWU9pM",
    authDomain: "inv-portfolio.firebaseapp.com",
    databaseURL: "https://inv-portfolio-default-rtdb.firebaseio.com",
    projectId: "inv-portfolio",
    storageBucket: "inv-portfolio.appspot.com",
    messagingSenderId: "794661650574",
    appId: "1:794661650574:web:ee5b12ab3dbd1bce3789df",
    measurementId: "G-NC71XWRFE4"
  },
};
const app = initializeApp(environment.firebase);
export {app};


