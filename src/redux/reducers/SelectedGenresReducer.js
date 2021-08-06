import * as actionTypes from "../actions/actionsTypes";
import initialState from './initialState'

export default function SelectedGenresReducer(state = initialState.selectedGenresInitial, action) { 
    switch (action.type) {
      case actionTypes.SELECTED_GENRES:
        return { state: action.payload };
  
      default:
        return state;
    }
  }
  