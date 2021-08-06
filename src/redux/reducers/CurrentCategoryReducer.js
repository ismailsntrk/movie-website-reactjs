import * as actionTypes from "../actions/actionsTypes";
import initialState from './initialState'

export default function CurrentCategoryReducer(state = initialState.currentCategory, action) { 
    switch (action.type) {
      case actionTypes.CURRENT_CATEGORY:
        return { state: action.payload };
  
      default:
        return state;
    }
  }
  