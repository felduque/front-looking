import userPasswordIcon from "../../../assets/key-login.png";
import "./Login.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "../hooks/axios";
import validateForm from "../validate.js";

export default function ResetPassword() {
  const [reset, setReset] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const { id, token } = useParams();
  const [setType, setSetType] = useState({
    client: false,
    tenant: false,
  });

  const handleChangeType = (e) => {
    const { name } = e.target;
    setSetType({
      client: false,
      tenant: false,
      [name]: true,
    });
  };

  const [errors, setErrors] = useState({});
  const errorsLength = Object.entries(errors).length;

  function handleSubmit(e) {
    e.preventDefault();

    setErrors(validateForm({ ...inputs, [e.target.name]: e.target.value }));
    if (password !== passwordConfirm) {
      setErrMsg("Las contraseñas no coinciden");
      return;
    }

    //`https://looking.fly.dev/reset/${match.params.id}/${match.params.accessToken}`

    if (setType.client === true) {
      axios
        .post(`/client/reset/${id}/${token}`, {
          password,
          passwordConfirm,
        })
        .then((res) => {
          setReset(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (setType.tenant === true) {
      axios
        .post(`/tenant/reset/${id}/${token}`, {
          password,
          passwordConfirm,
        })
        .then((res) => {
          setReset(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        title: "Reset fallido",
        text: "Algo salió mal, marca tipo de usuario.",
        icon: "error",
        confirmButtonText: "Entendido",
        timer: 4000,
      });
    }
  }

  useEffect(() => {
    setErrors(validateForm(inputs));
  }, [inputs]);

  useEffect(() => {
    if (reset) {
      navigate("/login");
    }
  }, [reset]);

  return (
    <>
      <div className="container-page-login">
        <div className="container-login">
          <div className="form-container-login">
            <section>
              <div className="error-messg-server">{errMsg}</div>

              <div class="title is-4 is-spaced">Resetear contraseña</div>
              <form onSubmit={handleSubmit}>
                <div class="field">
                  <p className="control has-icons-left">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="input"
                      placeholder="Contraseña"
                      autoComplete="off"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user">
                        <img src={userPasswordIcon} className="icon-login" />
                      </i>
                    </span>
                  </p>
                </div>

                <div class="field">
                  <p className="control has-icons-left">
                    <input
                      type="password"
                      id="password2"
                      name="password2"
                      className="input"
                      placeholder="Confirmar contraseña"
                      autoComplete="off"
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user">
                        <img src={userPasswordIcon} className="icon-login" />
                      </i>
                    </span>
                  </p>
                </div>

                <button class="button is-link is-rounded">Submit</button>
              </form>
              <p className="new-account">
                ¿No tienes cuenta? <br />
                <span>
                  <Link to="/register">Registrarme</Link>
                </span>
              </p>
              <div className="pt-3 pb-3">
                <button
                  name="client"
                  className={
                    setType.client === true
                      ? "button is-link is-rounded"
                      : "button is-link is-outlined has-tooltip-right is-rounded"
                  }
                  onClick={handleChangeType}
                >
                  Soy Cliente
                </button>
                <button
                  name="tenant"
                  onClick={handleChangeType}
                  className={
                    setType.tenant === true
                      ? "button is-link ml-4 is-rounded"
                      : "button is-link is-outlined has-tooltip-right ml-4 is-rounded"
                  }
                >
                  Soy Arrendatario
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
