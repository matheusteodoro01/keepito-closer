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
    case actions.loginSucces:
      return { ...state, isAuthenticated: true };
    case actions.loginFailure:
      return { ...state, isAuthenticated: false };
    case actions.signOut:
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


async function singUp( name, email, password, setIsLoading, setError, setErrorMessage) {
  setIsLoading(true);
  const data = {
    email,
    name,
    password,
    cpf: "",
    description: "",
    age: 0,
    score: 0,
    profile: "ADMIN"
  }
  setTimeout(() => {
    api.post('/users', data)

      .then(data => {
        setIsLoading(false);
        console.log('Sucessfull')
      })

      .catch(err => {
        setIsLoading(false);
        setErrorMessage(err.message)
        setError(true);
      })
  }, 2000);
}


async function login(dispatch, login, password, history, setIsLoading, setError, setErrorMessage) {
  setIsLoading(true);
  const data = {
    email: login,
    password: password
  }

  await api.post('/login', data)
    .then(response => {
      setTimeout(() => {
        localStorage.setItem("keepitoAuthorization", response.headers.authorization)
        api.defaults.headers['keepitoAuthorization'] = `${response.headers.authorization}`
        setIsLoading(false)
        dispatch({ type: actions.loginSucces });
        history.push('/app/dashboard')
      }, 2000);
    })

    .catch(error => {
      setTimeout(() => {
        setError(true);
        //  dispatch({ type: actions.loginFailure });
        setIsLoading(false);
        setErrorMessage('Algo está errado com seu login ou senha :(')
        setError(true);
      }, 2000);
    })

}

function signOut(dispatch, history) {
  localStorage.removeItem("keepitoAuthorization");
  dispatch({ type: actions.singOut });
  history.push("/login");
}

export { UserProvider, useUserState, useUserDispatch, singUp, login, signOut };