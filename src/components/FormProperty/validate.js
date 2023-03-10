//Validación de Formulario
export default function validateForm(inputs) {
  let errors = {};
  console.log("Validator ;) ", inputs);
  const title_REGEX =
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;

  if (inputs.title.length < 12) {
    errors.title =
      "Por favor agrega algunas palabras que hagan referencia a tu propiedad... Ej: Casa con vista a la playa";
  } else if (inputs.title.length > 60) {
    errors.title = "Sé breve";
  } else if (!title_REGEX.test(inputs.title)) {
    errors.title = "Sólo se aceptan letras";
  }

  if (inputs.description.length < 30) {
    errors.description = "Sé descriptivo con tu alojamiento";
  } else if (inputs.description.length > 250) {
    errors.description = "Sé breve en tu descripción";
  }

  if (inputs.checkIn === inputs.checkOut) {
    errors.checksTime = "Error de espacio-tiempo";
  }

  if (inputs.capacity < 1) {
    errors.title = "¡Imposible la capacidad no puede ser menos que 1!";
  } else if (inputs.capacity > 20) {
    errors.title = "No puede ser mayor a 20";
  }

  if (inputs.beds < 1) {
    errors.beds = "¡Imposible no puede haber menos de una cama!";
  } else if (inputs.beds > 20) {
    errors.beds = "No puede ser mayor a 20";
  }

  if (inputs.baths < 1) {
    errors.baths = "¡Imposible no puede haber menos de un baño!";
  } else if (inputs.baths > 20) {
    errors.baths = "No puede ser mayor a 20";
  }

  if (inputs.services.length === 0) {
    errors.services = "Ofrece algún servicio a los aventureros";
  }

  if (inputs.price < 1) {
    errors.price = "Ponle un precio a tu alojamiento";
  }
  if (inputs.price > 300) {
    errors.price = "El máximo por noche es $300";
  }
  if (inputs.lat === 0) {
    errors.geolocation = "En dónde se encuentra";
  }

  if (inputs.type === "") {
    errors.type = "Se necesita un tipo de propiedad";
  }
  return errors;
}
