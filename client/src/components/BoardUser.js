import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { useNavigate } from "react-router-dom";
import userService from "../services/user.service";

const BoardUser = () => {
    const currentUser = AuthService.getCurrentUser();
    console.log("CURRENT USER = ", currentUser);
  
  const navigate = useNavigate();
  function onDelete(event) {
    const id = event.target.dataset.id;
    console.log(event.target.dataset);

    if (id === currentUser.id) {
      alert(`Cant delete yourself your id is: ${currentUser.id} with email: ${currentUser.email}`);
      return;
    }

    if (window.confirm("Are you sure you want to delete!")) {
      console.log("Delete " + id);
      userService.deleteUserById(id).then((response) => { 
        window.location.reload();
      }, (error) => {
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
      })
    }
  }

  function onDetails(event) {
    navigate(`/users/${event.target.dataset.id}/activity`);
  }

  const [content, setContent] = useState("");
  console.log("user");

  useEffect(() => {
    UserService.getUsers().then(
      (response) => {
        console.log(response.data);
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
      <header className="jumbotron">
        <h2>Users</h2>
      </header>
      <hr />
      <br />
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Birthdate</th>
              <th>(action)</th>
            </tr>
          </thead>
          <tbody>
            {content &&
              content.map((item) => (
                <tr key={item.id}>
                  <td>{item.email}</td>
                  <td>{item.name}</td>
                  <td>{item.surname}</td>
                  <td>{item.birthDate.split("T")[0]}</td>
                  <td>
                    <button
                      data-id={item.id}
                      className="btn btn-danger m-1"
                      onClick={onDelete}
                    >
                      Delete
                    </button>

                    <button
                      data-id={item.id}
                      className="btn btn-info m-1"
                      onClick={onDetails}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BoardUser;
