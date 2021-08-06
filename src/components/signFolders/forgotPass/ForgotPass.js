import React, { useState } from "react";
import { Container } from "reactstrap";
import AuthService from "../../../services/AuthService";
const ForgotPass = () => {
  const [usera, setUsera] = useState({ email: "" });

  const onChange = (e) => {
    e.preventDefault();
    setUsera({ ...usera, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.forgotPassword(usera);

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

              <div className="form-group text-center">
                <button type="submit" className="btn btn-success btn-lg">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ForgotPass;
