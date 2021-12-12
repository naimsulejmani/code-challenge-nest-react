import AuthService from "../services/auth.service";
import React from "react";
const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  console.log("CURRENT USER = ", currentUser)
  


  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <div>
        {currentUser.roles}
 </div>
    </div>
  );
};

export default Profile;
