import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import GoogleButton from "react-google-button";

import { googleLogout } from "@react-oauth/google";

function UserLogin() {
  const login = useGoogleLogin({
    onSuccess: (response) => {
      setUserHasLoggedIn(true);
      console.log(response);
      const { access_token } = response;
      axios
        .post("/login", { access_token })
        .catch((error) => console.log(error));
    },
    scope: "https://www.googleapis.com/auth/calendar",
  });

  const logout = () => {
    setUserHasLoggedIn(false);
    googleLogout();
  };

  const [userHasLoggedIn, setUserHasLoggedIn] = useState(false);

  return userHasLoggedIn ? (
    <div className="login-logout">
      <center>
        <h1>Hello</h1>
        <GoogleButton label="Log out" onClick={logout} />
      </center>
    </div>
  ) : (
    <div className="login-logout">
      <center>
        <GoogleButton onClick={login} />
      </center>
    </div>
  );
}

export default UserLogin;
