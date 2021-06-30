import React,{createContext} from 'react';
import UserStore from './UserStore';
import Store from './Store';


export const USER = new UserStore('user');
export const PAGE = new Store('page');
export const PRESTATION = new Store('prestation');
export const LOGO = new Store('logo');
export const TESTIMONIAL = new Store('testimonial');
export const CATEGORY = new Store('category');

export const DBContext = createContext();

const DBContextProvider = props =>{

  return (
    <DBContext.Provider value={{USER, PAGE, PRESTATION,LOGO,TESTIMONIAL, CATEGORY }}>
      {props.children}
    </DBContext.Provider>
  )
}

export default DBContextProvider;