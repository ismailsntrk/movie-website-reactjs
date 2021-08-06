import * as actionTypes from "../actions/actionsTypes";
import initialState from './initialState'

export default function SearchContentReduver(state = initialState.searchContent, action) { 
    switch (action.type) {
      case actionTypes.SEARCH_CONTENT:
        return { state: action.payload };
  
      default:
        return state;
    }
  }
  