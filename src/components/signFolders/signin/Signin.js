import React, { useState, useContext } from "react";
import { Container } from "reactstrap";
import { AuthContext } from "../../../services/AuthContext";
import AuthService from "../../../services/AuthService";
import './Signin.scss'

const Signin = () => {
  const [usera, setUsera] = useState({ username: "", password: "" , role:"user" });
  const authContext = useContext(AuthContext);

  const onChange = (e) => {
    e.preventDefault();
    setUsera({ ...usera, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault(); 
    AuthService.register(usera).then((data) => {
      const { isAuthenticated, user } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
      }
    });
  };

  return (
    <Container>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-heading">
            <h2 className="text-center">Login</h2>
          </div>
          <hr />
          <div className="modal-body">
            <form onSubmit={onSubmit} >
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
                    <span className="glyphicon glyphicon-user"></span>
                  </span>
                  <input
                    onChange={onChange}
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Username"
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
                <button type="submit" className="btn btn-success btn-lg">
                  Login
                </button>
                <button  className="btn btn-link">
                  forget Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Signin;
