import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
//import 'bootstrap';
import App from './components/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import DBContextProvider from './database';
import AuthContextProvider from './contexts/authContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
/*
import { pages, prestations, categories, testimonials, users, logos } from './data'
import { PAGE, PRESTATION, CATEGORY, TESTIMONIAL, USER, LOGO } from './database'


pages.forEach(page => {
  PAGE.serviceWorkerAdd(page)
})
prestations.forEach(prestation => {
  PRESTATION.serviceWorkerAdd(prestation)
})
categories.forEach(category => {
  CATEGORY.serviceWorkerAdd(category)
})
testimonials.forEach(testimonial => {
  TESTIMONIAL.serviceWorkerAdd(testimonial)
})
users.forEach(user => {
  USER.serviceWorkerAdd(user)
})
logos.forEach(logo => {
  LOGO.serviceWorkerAdd(logo)
})

*/
ReactDOM.render(
  // <React.StrictMode>
    <DBContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </DBContextProvider>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
