import React, { useState } from "react";
import { Container } from "reactstrap";
import { useParams } from "react-router-dom";
import AuthService from "../../../services/AuthService";

const NewPassword = () => {
    
  const [usera, setUsera] = useState({ newPass: "" , resetLink:""});
  const { resetCode } = useParams();
  const onChange = (e) => {
    e.preventDefault();
    
    setUsera({ ...usera, [e.target.name]: e.target.value ,resetLink: resetCode});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if(usera.newPass === usera.newPass2){
      AuthService.resetPassword(usera)
    }
    else{
      alert("Girilen Şifrelerin Aynı Olması Gerekmektedir")
    }
 
   
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
                    name="newPass"
                    type="password"
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
                    name="newPass2"
                    type="password"
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

export default NewPassword;
