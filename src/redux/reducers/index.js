import { combineReducers } from "redux";
import CurrentCategoryReducer from './CurrentCategoryReducer'
import SearchContentReducer from './SearchContentReducer'
import SelectedGenresReducer from './SelectedGenresReducer'

const rootReducer = combineReducers({
CurrentCategoryReducer,SearchContentReducer , SelectedGenresReducer
});

export default rootReducer;
