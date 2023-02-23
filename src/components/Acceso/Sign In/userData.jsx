import React, { Component, useEffect, useState } from "react";
//import AdminHome from "./adminHome";
import useAuth from "../hooks/useAuth";
//import UserHome from "./userHome";

export default function UserDetails() {
  const { auth, setAuth } = useAuth();
  //const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (auth.role === "Client") {
      fetch("https://looking.fly.dev/client/userData", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userData");

          setAuth(data.data);

          if (data.data == "token expired") {
            alert("Token expired login again");
            localStorage.clear();
            window.location.href = "./login";
          }
        });
    } else if (auth.role === "Tenant" || auth.role === "Admin") {
      fetch("https://looking.fly.dev/tenant/userData", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userData");

          setAuth(data.data);

          if (data.data == "token expired") {
            alert("Token expired login again");
            localStorage.clear();
            window.location.href = "./login";
          }
        });
    }
  }, []);

  return (
    <>
      <div>{auth.email}</div>
    </>
  );
  //return admin ? <AdminHome /> : <UserHome userData={userData} />;
}
