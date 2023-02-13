import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import "./Login.css";

const LoginGoogle = () => {
  const { handleGoogle, loading, error } = useFetch(
    "https://looking.fly.dev/loginGoogle"
  );

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id:
          "660345247825-98lejr83tl8hbsvse19jrnj8dbc0tvus.apps.googleusercontent.com",
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("loginDiv"), {
        type: "standard",
        theme: "filled_black",
        size: "medium",

        text: "signin_with",
        shape: "pill",
      });

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  return (
    <>
      <main>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? <div>Loading....</div> : <div id="loginDiv"></div>}
      </main>
      <footer></footer>
    </>
  );
};

export default LoginGoogle;
