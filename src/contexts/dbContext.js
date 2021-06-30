import React from 'react';
import * as localforage from 'localforage';


const dbname ='pao'
export const userStore = localforage.createInstance({
  name: dbname,
  storeName: 'userStore'
})

export const DBContext = React.createContext();

 const DBContextProvider = props =>{
  return(
    <DBContext.Provider value ={{userStore}}>
      {props.children}
    </DBContext.Provider>

  )
}

export default DBContextProvider;
