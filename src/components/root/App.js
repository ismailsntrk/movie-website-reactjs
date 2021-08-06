import Dashboard from "../dashboard/Dashboard";
import Footer from "../footer/Footer";
import Navi from "../navi/Navi";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Signup from "../signFolders/signup/Signup";
import CategoriesPage from "../categoriesPage/CategoriesPage";
import Signin from "../signFolders/signin/Signin";
import SignComplete from "../signFolders/activatedPage/SignComplete";
import ForgotPass from "../signFolders/forgotPass/ForgotPass";
import NewPassword from "../signFolders/newPassword/NewPassword";
import AddMovie from "../addMovie/AddMovie";
import MyList from "../myList/MyList";
import MoviePage from "../moviePage/MoviePage";
import MovieViewsRank from "../movieViewRank/MovieViewsRank";

function App() {
  return (
    <div className="App">
      <Navi></Navi>

      <Switch>
        <Route path="/" exact component={Dashboard}></Route>
        <Route
          path="/authentication/activate/:activationCode"
          exact
          component={SignComplete}
        ></Route>
        <Route
          path="/resetpassword/:resetCode"
          exact
          component={NewPassword}
        ></Route>
        <Route path="/forget-password" exact component={ForgotPass}></Route>
        <Route path="/new-movie" exact component={AddMovie}></Route>
        <Route path="/mylist" exact component={MyList}></Route>
        <Route path="/watch/:movieTitle" exact component={MoviePage}></Route>
        <Route path="/genres" exact component={CategoriesPage}></Route>
        <Route path="/signin" exact component={Signup}></Route>
        <Route path="/signup" exact component={Signin}></Route>
        <Route
          path="/movie-views-rank"
          exact
          component={MovieViewsRank}
        ></Route>
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;
