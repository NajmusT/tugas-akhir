import React, { createContext, useReducer } from "react";
import SchoolActionTypes from "../Constants/ActionTypes/SchoolActionTypes";
import SchoolReducer from "./AppReducer"

// Initial State
const initialState = {
    schools: []
};

//Create Context
export const GlobalContext = createContext(initialState);

//Provider Component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SchoolReducer, initialState);

    //Action dispatchers
    const removeSchool = (id) => {
        dispatch({
            type: SchoolActionTypes.REMOVE_SCHOOL,
            payload: id
        })
    }

    const addSchool = (school) => {
        dispatch({
            type: SchoolActionTypes.ADD_SCHOOL,
            payload: school
        })
    }

    const editSchool = (school) => {
        dispatch({
            type: SchoolActionTypes.EDIT_SCHOOL,
            payload: school
        })
    }

    return (
        <GlobalContext.Provider value={{
            Schools: state.Schools,
            removeSchool,
            addSchool,
            editSchool
        }}>
            {children}
        </GlobalContext.Provider>
    )
}