import AuthService from "../services/auth.service";
import { useParams } from "react-router-dom";
import UserService from "../services/user.service";
import React, { useState, useRef, useEffect } from "react";
import EventBus from "../common/EventBus";

const LoginActivity = () => {
  const [content, setContent] = useState("");
  const { id } = useParams();
  const currentUser = AuthService.getCurrentUser();
  useEffect(() => {
    UserService.getUserActivity(id).then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3>
            The login activiti for the user id: <strong>{id}</strong>{" "}
          </h3>
                  <h3>{currentUser.email}</h3>
                  <a href="#" onClick={()=>{window.history.back()}}> Back to user lists!</a>
        </div>
          </div>
          <hr />
      <div className="row">
        <div className="col">
                  <table className='table'>
                      <thead>
                          <tr>
                              <th>id</th>
                              <th>date</th>
                              <th>time</th>
                          </tr>
                      </thead>
                      <tbody>
                          {
                              content && content.map((item) => {
                                  return (<tr>
                                      <td>{item.id}</td>
                                      <td>{item.loginDate.split('T')[0]}</td>
                                      <td>{item.loginDate.split('T')[1].split('.')[0]}</td>
                                  </tr>)
                              })
                          }
                      </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoginActivity;
