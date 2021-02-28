var Persona = {
  nombre: "",
  edad: 0,
  NSS: String,
  sexo: "H",
  peso: 0,
  altura: 0,

  getNombre() {
    return this.nombre;
  },
};

function crearPersona(nombre, edad, sexo, peso, altura) {
  Persona = {
    nombre,
    edad,
    sexo,
    peso,
    altura,
  };
  console.log(Persona);
}

function calcularIMC() {
  let imc = Persona.peso / Math.pow(Persona.altura, 2);
  if (Persona.sexo === "H") {
    if (imc < 20) {
      return -1;
    } else if (imc > 25) {
      return 1;
    } else {
      return 0;
    }
  } else {
    if (imc < 19) {
      return -1;
    } else if (imc > 24) {
      return 1;
    } else {
      return 0;
    }
  }
}

function esMayorDeEdad() {
  return Persona.edad >= 18;
}

function comprobarSexo(sexo) {
  return Persona.sexo === sexo;
}

function toString() {
  return Persona;
}

function generarNSS() {
  Persona.NSS = Math.random().toString(36).substring(2, 10);
}

crearPersona("johan", 22, "H", 70, 1.80);
console.log(Persona.getNombre());
// console.log(calcularIMC());
// console.log(esMayorDeEdad());
// console.log(comprobarSexo("H"));
// console.log(toString());
