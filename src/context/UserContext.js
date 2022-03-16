import React, { useState, useReducer, createContext } from "react";

import api from '../services/api'
var UserStateContext = createContext();
var UserDispatchContext = createContext();

const initialState = { email: '', isAuthenticated: '' }
const actions = {
  loginSucces: 'LOGIN_SUCCESS',
  loginFailure: 'LOGIN_FAILURE',
  singOut: 'SIGN_OUT_SUCCESS'
}

function userReducer(state, action) {
  switch (action.type) {
    case action.loginSucces:
      return { ...state, isAuthenticated: true };
    case action.loginFailure:
      return { ...state, isAuthenticated: false };
    case action.signOut:
      return { ...state, isAuthenticated: false };
    case action.payload:
      return { email: action.payload };
    default: {
      return { ...state, isAuthenticated: false };
    }
  }
}

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState)
  const [email, setEmail] = useState('')

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}



// ###########################################################

async function loginLoja(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  const data = {
    email: login,
    senha: password
  }


  await api.post('/login/loja', data)
    .then(response => {
      //     await api.get('usuario/?')
      setTimeout(() => {
        localStorage.setItem("Authorization", response.data.token)
        api.defaults.headers['Authorization'] = `${response.data.token}`
        setError(false)
        setIsLoading(false)
        dispatch({ type: actions.loginSucces, payload: login })
        history.push('/app/dashboard')
      }, 2000);
    })

    .catch(error => {
      setTimeout(() => {
        // dispatch({ type: "LOGIN_FAILURE" });
        setError(true);
        setIsLoading(false);
      }, 2000);
    })

}

async function loginEntregador(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  const data = {
    email: login,
    senha: password
  }

  await api.post('/login/entregador', data)
    .then(response => {
      console.log(response.data.token)
      setTimeout(() => {
        localStorage.setItem("Authorization", response.data.token)
        api.defaults.headers['Authorization'] = `${response.data.token}`
        setError(false)
        setIsLoading(false)
        dispatch({ type: actions.loginSucces })

        history.push('/app/dashboard')
      }, 2000);
    })

    .catch(error => {
      setTimeout(() => {
        // dispatch({ type: "LOGIN_FAILURE" });
        setError(true);
        setIsLoading(false);
      }, 2000);
    })

}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: actions.singOut });
  history.push("/login");
}

export { UserProvider, useUserState, useUserDispatch, loginLoja, loginEntregador, signOut };