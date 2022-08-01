//Seletores
let pantalla = document.querySelector("canvas");
let botonNuevoJuego = document.getElementById("btn-nuevo-juego").style.display = "none"
let btnSalirDesaparecer = document.getElementById("btn-salir").style.display = "none"
let divAgregarPalabra = document.getElementById("agregar-palabra").style.display = 'none';
let btnNuevoJuego = document.getElementById("btn-nuevo-juego");
let btnSalir = document.getElementById("btn-salir");
let btnCancelar = document.getElementById("btn-cancelar");


var palabras = ['ALURA', 'AHORCADO', 'HTML', 'ORACLE', 'JAVASCRIPT', 'LOGICA', 'PROGRAMACION', 'DESAFIO','CARAMELO','DEDO','JUEGO','VERDAD','LAPIZ','AMOR'];
var tablero = document.getElementById('horca').getContext('2d');
var palabraSecreta = "";
var letras = [];
var palabraCorrecta = "";
var errores = 8;
let letrasIncorrectas = [];
let numeroDeErrores = 8
let letraElegida = [];

//eventos

// inicio el juego
document.getElementById("iniciar-juego").onclick = () => {
  iniciarJuego();
}

// "btn-guardar"
document.getElementById("btn-guardar").onclick = () => {
  guardarPalabra();
 
}

//actualiza "nuevo juego"
btnNuevoJuego.addEventListener("click", function () {
  location.reload();
});

//botón "salir"
btnSalir.addEventListener("click", function () {
  location.reload();
});

//botón "cancelar"
btnCancelar.addEventListener("click", function () {
  location.reload();
});


//sortea la palabra que será usada en el ahorcado
function escojerPalabraSecreta() {
  let palabra = palabras[Math.floor(Math.random() * palabras.length)]
  palabraSecreta = palabra
  return palabra
}



// letra en que el usuario hizo clic
function verificarLetraClicada(key) {
  if (letras.length < 1 || letras.indexOf(key) < 0) {
    letras.push(key)
    return false
    
  }
  else {
    letras.push(key)
    return true
  }
}

function adicionarLetraCorrecta(i) {
  palabraCorrecta += palabraSecreta[i].toUpperCase()
}

function adicionarLetraIncorrecta(letter) {
  if (palabraSecreta.indexOf(letter) <= 0) {
    errores -= 1
  }
}


function verificarFinJuego(letra) {
 if(letraElegida.length < palabraSecreta.length) { 
    letrasIncorrectas.push(letra);
    
    if (letrasIncorrectas.length > numeroDeErrores) {
      perdiste()
    }
    else if(letraElegida.length < palabraSecreta.length) {
      adicionarLetraIncorrecta(letra)
      escribirLetraIncorrecta(letra, errores)
    }
  }
 } 

//Verifica si el usuario ha ganado
function verificarVencedor(letra) {
  letraElegida.push(letra.toUpperCase());
  if (letraElegida.length == palabraSecreta.length) {

    ganaste()
    
  }

}



//impide que teclas como shift y otras, sean consideradas errores y sean escritas
function verificarLetra(keyCode) {
  if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
    return true;
  } else {
    return false;
  }
}


//haz con que los botones de la pantalla de home desaparezcan y los de la de agregar palabra aparezcan
function ensenarPantallaDeAgregarPalabra() {
  document.getElementById("div-desaparece").style.display = 'none';
  document.getElementById("agregar-palabra").style.display = "block";

}

// palabra que el usuario quiere agregar
function guardarPalabra() {
  let nuevaPalabra = document.getElementById('input-nueva-palavra').value;

  
  if(nuevaPalabra !== ""){
    palabras.push(nuevaPalabra.toUpperCase());
    alert('La palabra fue guardada')
    
    document.getElementById("agregar-palabra").style.display = "none";
    iniciarJuego();
  }
  else{
    alert("Ninguna palabra ha sido digitada")
  }

}

//inicia el juego
function iniciarJuego() {
  document.getElementById("div-desaparece").style.display = 'none';
  dibujarTablero();
  escojerPalabraSecreta();
  dibujarLineas();

  document.getElementById("btn-nuevo-juego").style.display = "block"
  document.getElementById("btn-salir").style.display = "block"

  document.onkeydown = (e) => {
    let letra = e.key.toUpperCase()

    if (letrasIncorrectas.length <= numeroDeErrores) {
      if (!verificarLetraClicada(e.key) && verificarLetra(e.keyCode)) {
        if (palabraSecreta.includes(letra)) {
          adicionarLetraCorrecta(palabraSecreta.indexOf(letra))
          for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) {
              escrribirLetraCorrecta(i)
              verificarVencedor(letra)

            }
          }

        }
        else {
          if (!verificarLetraClicada(e.key) && !verificarVencedor(letra)) return
          dibujarAhorcado(errores)
          verificarFinJuego(letra)
        }
      }
    }
    else {
      alert('has llegado al límite de letras incorrectas')
    }

  };
}



