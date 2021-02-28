function Persona(nombre, edad, sexo, peso, altura) {
  this.nombre = nombre;
  this.edad = edad;
  this.sexo = sexo;
  this.peso = peso;
  this.altura = altura;

  this.getNombre = function () {
    return this.nombre;
  };
  this.getEdad = function () {
    return this.edad;
  };
  this.getSexo = function () {
    return this.sexo;
  };
  this.getPeso = function () {
    return this.peso;
  };
  this.getAltura = function () {
    return this.altura;
  };

  this.setNombre = function (nombre) {
    this.nombre = nombre;
  };
  this.setEdad = function (edad) {
    this.edad = edad;
  };
  this.setSexo = function (sexo) {
    this.sexo = sexo;
  };
  this.setPeso = function (peso) {
    this.peso = peso;
  };
  this.setAltura = function (altura) {
    this.altura = altura;
  };

  this.calcularIMC = function () {
    let imc = this.getPeso / Math.pow(this.getAltura, 2);
    if (this.getSexo === "H") {
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
  };

  this.esMayorDeEdad = function () {
    return this.edad >= 18;
  };
  this.comprobarSexo = function (sexo) {
    return this.sexo === sexo;
  };
  this.toString = function () {
    return {
      nombre: this.getNombre(),
      edad: this.getEdad(),
      sexo: this.getSexo(),
      peso: this.getPeso(),
      altura: this.getAltura(),
      NSS: this.NSS,
    };
  };
  this.generarNSS = function () {
    this.NSS = Math.random().toString(36).substring(2, 10);
  };
}
