import React, { useState, useContext } from "react";
import { Container } from "reactstrap";
import { AuthContext } from "../../../services/AuthContext";
import AuthService from "../../../services/AuthService";
import { Link } from "react-router-dom";
import {Button} from 'reactstrap'
const Signup = ({send}) => {
  const [usera, setUsera] = useState({ username: "", password: "" });
  const authContext = useContext(AuthContext);

  const onChange = (e) => {
    e.preventDefault();
    setUsera({ ...usera, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    AuthService.login(usera).then((data) => {
      const { isAuthenticated, user } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        window.location.reload();
      }
    });
  };

  return (
    <Container>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-heading">
            <h2 style={{ color: "black" }} className="text-center">
              Login
            </h2>
          </div>
          <hr />
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-user"></span>
                  </span>
                  <input
                    onChange={onChange}
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-lock"></span>
                  </span>
                  <input
                    name="password"
                    onChange={onChange}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="form-group text-center">
              <Button style={{marginRight:'2em'}} color="success">
                  Login
                  </Button>
                  <Button onClick={send} color="danger">
                <Link style={{textDecoration:"none" ,color:'white'}} to="/forget-password">
                forget Password
                </Link>
                </Button>
                <Button onClick={send} style={{marginLeft:'2em'}} color="warning">
                  <Link style={{textDecoration:"none" ,color:'white'}} to="/signup">
                   Sign Up
                  </Link>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
