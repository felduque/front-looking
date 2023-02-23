import { useEffect } from "react";
import useScript from "./useScrip";

export default function MPButtonSuscription({
  idTenant,
  emailTenant,
  nameTenant,
}) {
  //   const auth = JSON.parse(localStorage.getItem("auth"));
  //   // console.log(JSON.parse(auth));
  //   console.log(auth);
  //   const idClient = auth.idClient;
  //   const emailClient = auth.email;

  console.log(idTenant, emailTenant, nameTenant);

  const dataPropClien = {
    client: {
      id: idTenant,
      name: nameTenant,
      email: emailTenant,
    },
  };

  const { MercadoPago } = useScript(
    "https://sdk.mercadopago.com/js/v2",
    "MercadoPago"
  );

  useEffect(() => {
    // The async function is needed since we can't do async stuff in the top level of our useEffect
    const fetchCheckout = async () => {
      const res = await fetch("https://looking.fly.dev/pago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPropClien),
      });
      const data = await res.json();
      console.log(data.body.id);

      // data.global is the ID that MP returns from the API, it comes from our backend route
      if (data) {
        // const script = document.createElement("script"); // Here we create the empty script tag
        // script.type = "text/javascript"; // The type of the script
        // script.src = "https://sdk.mercadopago.com/js/v2"; // The link where the script is hosted
        // script.setAttribute("data-preference-id", data.body.id); // Here we set its data-preference-id to the ID that the Mercado Pago API gives us
        // document.body.appendChild(script); // Here we append it to the body of our page

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore

        // Here we create the button, setting the container, our public key and the ID of the preference that Mercado Pago API returns in its response

        const mp = await new MercadoPago(
          // CRED DE PUEBA CON CUENTA NORMAL
          // "TEST-137b6be0-b064-4d95-98b8-077723d4ebb1",
          // CRED DE PROD CON USUARIO DE PRUEBA
          "APP_USR-41cc642e-f6ee-41eb-a48c-adce822c53eb",
          {
            locale: "es-PE",
          }
        );

        // The ".checkout" is the function that creates the connection between the button and the platform

        mp.checkout({
          preference: {
            id: data.body.id,
          },
          render: {
            container: ".cho-container",
            label: "Obtener ahora",
          },
          theme: {
            elementsColor: "#3D8C00",
          },
        });
      }
    };

    fetchCheckout();
    // setTimeout(() => {
    //   fetchCheckout();
    // }, 0);
  }, [MercadoPago]);

  return <div className="cho-container"></div>;
}
