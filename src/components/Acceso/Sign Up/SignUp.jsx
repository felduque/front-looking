import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import validateForm from "./validate.js";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "./SignUp.css";

import leftarrow from "../../../assets/flecha-izquierda.png";
import welcomeUser from "../../../assets/welcome-user.png";

export default function SignUp() {
  const [inputs, setInputs] = useState({
    fullName: "",
    password: "",
    password2: "",
    email: "",
    phone: null,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //Estado de Captcha
  const [validCaptcha, setValidCaptcha] = useState(false);
  //Estado de tipo de cuenta
  const [typeAccount, setTypeAccount] = useState("");

  let allDataUser = {
    fullName: inputs.fullName,
    password: inputs.password,
    email: inputs.email,
    phone: inputs.phone,
    role: typeAccount,
  };

  const [errors, setErrors] = useState({});
  const errorsLength = Object.entries(errors).length;

  //Cambia estados de error e input. Llama a ValidateForm
  function handleChange(event) {
    event.preventDefault();

    setInputs({ ...inputs, [event.target.name]: event.target.value }); //Acceder al name del elemento, y guardar value

    setErrors(
      validateForm({ ...inputs, [event.target.name]: event.target.value })
    );
  }
  //ReCaptcha
  const captcha = useRef(null);
  console.log("Captcha: ", validCaptcha);
  const onChangeCaptcha = () => {
    if (captcha.current.getValue()) {
      setValidCaptcha(true);
      console.log("Captcha: ", validCaptcha);
    }
  };

  //Controlador de envío
  function handleSubmit(evt) {
    evt.preventDefault();
    if (
      !inputs.fullName ||
      !inputs.password ||
      !inputs.password2 ||
      !inputs.email ||
      !inputs.phone ||
      !validCaptcha ||
      !typeAccount ||
      errorsLength !== 0
    ) {
      Swal.fire({
        title: "Registro fallido",
        text: "Algo salió mal, intenta de nuevo.",
        icon: "error",
        confirmButtonText: "Entendido",
        timer: 4000,
      });
    } else {
      setErrors(
        validateForm({
          ...inputs,
          [evt.target.name]: evt.target.value,
        })
      );
      //ENVÍO
      createUser(allDataUser);
      Swal.fire({
        title: "Registrado con éxito",
        text: "Te has registrado con éxito. Ahora puedes iniciar sesión.",
        imageUrl: welcomeUser,
        imageWidth: 200,
        imageHeight: 180,
        confirmButtonText: "Entendido",
        timer: 4000,
      });
      setTimeout(() => {
        navigate(from, { replace: true });
        window.location.reload();
      }, 4000);

      setInputs({
        fullName: "",
        password: "",
        password2: "",
        email: "",
        phone: null,
      });
    }
  }

  async function createUser(dataUser) {
    if (typeAccount === "Client") {
      try {
        await axios.post("https://looking.fly.dev/client/createuser", dataUser);
      } catch (err) {
        console.error(err, "Error create new user");
      }
    } else if (typeAccount === "Tenant") {
      try {
        await axios.post(
          "https://looking.fly.dev/tenant/createtenant",
          dataUser
        );
      } catch (err) {
        console.error(err, "Error create new tenant");
      }
    }
  }

  useEffect(() => {
    setErrors(validateForm(inputs));
  }, [inputs]);

  function userType1() {
    setTypeAccount("Client");
  }

  function userType2() {
    setTypeAccount("Tenant");
  }
  function back() {
    navigate(from, { replace: true });
  }

  return (
    <div>
      <div>
        <img src={leftarrow} alt="" className="btnBackSignup" onClick={back} />
      </div>
      <div className="container-page">
        <div className="c-reg">
          <div className="form-container">
            <div className="title is-2 is-spaced space-between-title">
              Regístrate para comenzar la aventura
            </div>
            <form onSubmit={handleSubmit}>
              <p>
                <input
                  type="text"
                  name="fullName"
                  className={
                    errors.name
                      ? "input is-danger"
                      : "input is-success input-space"
                  }
                  value={inputs.fullName}
                  placeholder="Nombre completo"
                  onChange={(event) => handleChange(event)}
                />
                {errors.name ? (
                  <p className="space-between-inputs ">
                    <span className="error">{errors.name}</span>
                  </p>
                ) : null}
              </p>
              <p>
                <input
                  type="password"
                  name="password"
                  className={
                    errors.password
                      ? "input is-danger"
                      : "input is-success input-space"
                  }
                  value={inputs.password}
                  placeholder="Contraseña"
                  onChange={(event) => handleChange(event)}
                />
                {errors.password ? (
                  <p className="space-between-inputs ">
                    <span className="error">{errors.password}</span>
                  </p>
                ) : null}
              </p>
              <p>
                <input
                  type="password"
                  name="password2"
                  className={
                    errors.password2
                      ? "input is-danger"
                      : "input is-success input-space"
                  }
                  value={inputs.password2}
                  placeholder="Repetir contraseña"
                  onChange={(event) => handleChange(event)}
                />
                {errors.password2 ? (
                  <p className="space-between-inputs ">
                    <span className="error">{errors.password2}</span>
                  </p>
                ) : null}
              </p>
              <p>
                <input
                  type="text"
                  name="email"
                  className={
                    errors.mail
                      ? "input is-danger"
                      : "input is-success input-space"
                  }
                  value={inputs.email}
                  placeholder="Correo electrónico"
                  onChange={(event) => handleChange(event)}
                />
                {errors.mail ? (
                  <p className="space-between-inputs ">
                    <span className="error">{errors.mail}</span>
                  </p>
                ) : null}
              </p>
              <p>
                <input
                  type="text"
                  name="phone"
                  className={
                    errors.phone
                      ? "input is-danger"
                      : "input is-success input-space"
                  }
                  value={inputs.phone}
                  placeholder="Teléfono"
                  onChange={(event) => handleChange(event)}
                />
                {errors.phone ? (
                  <p class="space-between-inputs ">
                    <span className="error">{errors.phone}</span>
                  </p>
                ) : null}
              </p>
              <p>
                <ReCAPTCHA
                  ref={captcha}
                  sitekey="6Le2F0EkAAAAAPCok1gCfpggSPFK8oKRBI5GDSAE"
                  onChange={onChangeCaptcha}
                  render
                />
              </p>
              <p>
                <div className="type-acoount-cont">
                  <div className="type-account">
                    <div
                      className={
                        typeAccount === "Tenant"
                          ? "button is-info has-tooltip-multiline"
                          : "button is-info is-outlined has-tooltip-multiline"
                      }
                      data-tooltip="Hospedador: Te permite publicar hsopedaje que rentes. Si eres viajero debes crear otra cuenta como Hospedero"
                      onClick={userType2}
                    >
                      Ofrezco hospedaje
                    </div>
                  </div>
                  <div
                    className={
                      typeAccount === "Client"
                        ? "button is-info"
                        : "button is-info is-outlined has-tooltip-right"
                    }
                    data-tooltip="Hospedero: Permite buscar hospedaje a donde vayas. Para publicar hospedajes que rentas debes crear otra cuenta como hospedador"
                    onClick={userType1}
                  >
                    Busco hospedaje
                  </div>
                </div>
              </p>
              <p>
                <button
                  type="submit"
                  className="button is-link is-rounded space-between-button"
                  disabled={
                    !inputs.fullName ||
                    !inputs.password ||
                    !inputs.password2 ||
                    !inputs.email ||
                    !inputs.phone ||
                    !validCaptcha ||
                    !typeAccount ||
                    errorsLength !== 0
                  }
                >
                  Registrarme
                </button>
              </p>
              <div>
                <p>¿Ya estás registrado?</p>
                <Link to="/login">Inicia sesión</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
