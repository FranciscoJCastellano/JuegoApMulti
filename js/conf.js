/*funciones paraorganizar pestañas y demás acciones ajenas al juego*/
function ver(){
  document.getElementById("menu").style.display="block";
}
function esconder(){
  document.getElementById("menu").style.display="none";
}

function hacerVisible(idEl){

  start();
  if(idEl<0||idEl>5){
    alert("xddd");
    idEl=0;
  }
  switch(idEl){
    case 0:
    document.getElementById("juego").className = "visiblx";
    break;
    case 1:
    document.getElementById("descripcion").className = "visiblx";
    break;
    case 2:
    document.getElementById("proceso").className = "visiblx";
    break;
    case 3:
    document.getElementById("autores").className = "visiblx";
    break;
    case 4:
    document.getElementById("referencias").className = "visiblx";
    break;
  }
}

function start(){
  document.getElementById("juego").className = "ocultx";
  document.getElementById("descripcion").className = "ocultx";
  document.getElementById("proceso").className = "ocultx";
  document.getElementById("autores").className = "ocultx";
  document.getElementById("referencias").className = "ocultx";
}

/************************************
Autor: Francisco Javier Castellano Farrak
Fecha: 14/3/18
Definición: función que randomiza los valores rgb
*************************************/
function randomRgb() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}
