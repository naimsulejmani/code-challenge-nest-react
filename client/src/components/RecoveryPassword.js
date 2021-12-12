import React, { useState, useRef } from "react";
import { isEmail } from "validator";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import CommonValidation from '../common/common-validation';
import AuthService from "../services/auth.service";
const required = CommonValidation.required;
const validEmail = CommonValidation.validEmail;

const RecoveryPassword = () => {
  const form = useRef();
  const [email, setEmail] = useState("");
  console.log(CommonValidation)

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    AuthService.recovery(email).then((response) => {
      alert("New password has been generated and sent to your email, please check your inbox!");
    },(err)=>{
      console.log(err);
    })
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Recovery Your password page</h3>
      </header>
      <hr />
      <Form onSubmit={handleRegister} ref={form}>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required, validEmail]}
              />
            </div>
          </div>
        </div>

        <div className="row mt-1">
          <div className="col">
            <button className="btn btn-primary btn-block" type="submit">
              Reset Password
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default RecoveryPassword;
