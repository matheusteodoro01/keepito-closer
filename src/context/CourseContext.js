import React, { useState, useReducer, createContext } from "react";

import api from '../services/api'
var CourseStateContext = createContext();
var CourseDispatchContext = createContext();

const initialState = { email: '', isAuthenticated: '' }

function GetCoursesGrid(){
  let dadosGrid = [
    ["Teste", 1, "teste"],
    ["Teste1", 45, "teste1"],
    ["Teste2", 32, "teste2"],
  ];
  return dadosGrid;
}

function AddCourse(dadosForm){
  return true;
}

function EditCourse(dadosForm){
  return true;
}

function DeleteCourse(idCourse){
  return true;
}

export { GetCoursesGrid, EditCourse, AddCourse, DeleteCourse };