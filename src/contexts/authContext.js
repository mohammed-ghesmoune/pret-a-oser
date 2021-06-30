import React, {useState , useEffect} from 'react';

const AuthContext = React.createContext();
const AuthContextProvider = props =>{

  const [auth, setAuth] = useState(null)
  
  useEffect(()=>{
    setAuth(JSON.parse(sessionStorage.getItem('isUserAuth')))
  },[])

  return(
    <AuthContext.Provider value={{auth, setAuth}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;
export {AuthContext};