import React, { useContext, useEffect, useState } from "react";
import "./Navi.scss";
import logo from "../../assets/logoMow.png";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../services/AuthContext";
import AuthService from "../../services/AuthService";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../redux/actions/actionsTypes";
import { Button, Modal } from "reactstrap";
import Signup from "../signFolders/signup/Signup";

const Navi = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const [toggleState, setToggleState] = useState(false);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    const searchContent = (item) => {
      dispatch({ type: actionTypes.SEARCH_CONTENT, payload: item });
    };
    searchContent(search);
  }, [dispatch, search]);

  const toggler = () => {
    setToggleState(!toggleState);
  };

  useEffect(() => {
    if (location.pathname === "/") {
      document.getElementById("navbar").style.position = "absolute";
      document.getElementById("navbar").style.backgroundColor =
        "rgba(0,0,0,0.6)";
    } else {
      document.getElementById("navbar").style.position = "unset";
      document.getElementById("navbar").style.backgroundColor = "#333A40";
    }

    if (location.pathname === "/genres") {
      document.getElementById("archive").style.color = "red";
    } else {
      document.getElementById("archive").style.color = "white";
    }
  }, [toggleState, location.pathname]);

  const onChange = (e) => {
    document.getElementById("navbar").style.position = "unset";
    document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,0);";
    e.preventDefault();

    setSearch(e.target.value);
  };

  const logout = () => {
    AuthService.logout()
    setTimeout(() => {
      window.location.reload()
    }, 400);
  };

  const dashboard = () => {
    setToggleState(!toggleState);
    setSearch("");
  };

  return (
    <div id="navbar">
      <div id="container">
        <div id="logo">
          <Link to="/">
            <img onClick={dashboard} id="logo-img" src={logo} alt="logo"></img>
          </Link>
        </div>
        <div className="nav-buttons" onClick={toggler}>
          <Link className="links" to="/genres" id="archive">
            Listeler
          </Link>
        </div>
        {authContext.isAuthenticated === true ? (
          <div className="nav-buttons" onClick={toggler}>
            <Link className="links" id="most-viewed" to="/myList">
              Listem
            </Link>
          </div>
        ) : null}

        <div id="search">
          <input
            onChange={onChange}
            placeholder="search"
            id="search-input"
          ></input>
        </div>
        <div id="sign">
          {authContext.isAuthenticated === false ? (
            <div className="nav-buttons" onClick={toggle} id="sign">
              <Button color="danger" onClick={toggle}>
                Giriş
              </Button>
            </div>
          ) : (
            <Button color="danger" onClick={logout}>
              Çıkış Yap
            </Button>
          )}
        </div>
      </div>

      <div>
        <Modal centered={true} isOpen={modal} toggle={toggle}>
          <div>
            <Signup send={toggle}></Signup>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Navi;
