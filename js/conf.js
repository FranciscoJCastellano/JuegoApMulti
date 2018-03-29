/*funciones paraorganizar pestañas y demás acciones ajenas al juego*/
var juegoId;
var descrId;
var procId;
var autId;
var refId;
var menu;
var data;
var loadWheel;
var bodyEl;
function ver(){
  menu.style.display="block";
  // data.style.display="none";
}
function esconder(){
  menu.style.display="none";
  data.style.display="block";
}
/*********************
Función para inicializar los elementos necesarios DOM
**********************/
function initIds(){
  menu=document.getElementById("menu");
  data=document.getElementById("dataJuego");
  bodyEl=document.getElementsByTagName("body")[0];
  pags=document.getElementById("pags");
  juegoId=document.getElementById("juego");
  descrId=document.getElementById("descripcion");
  procId=document.getElementById("proceso");
  autId=document.getElementById("autores");
  refId=document.getElementById("referencias");
  loadWheel=document.getElementById("wheel");
  pags.className = "ocultx";
  ver();
}
document.addEventListener("DOMContentLoaded", initIds, false);

function loading(){
  if(!isLoading){
    loadWheel.className = "ocultx";
    pags.className = "visiblx";
  }else if(isLoading){
    pags.className = "ocultx";
    loadWheel.className = "visiblx";
  }
}

function hacerVisible(idEl){

  start();
  if(idEl<0||idEl>5){
    alert("xddd");
    idEl=0;
  }
  switch(idEl){
    case 0:
    juegoId.className = "visiblx";
    bodyEl.className="noFondo";
    break;
    case 1:
    descrId.className = "visiblx";
    bodyEl.className="fondo";
    pause(videoJuego, audioJuego);
    break;
    case 2:
    procId.className = "visiblx";
    bodyEl.className="fondo";
    pause(videoJuego, audioJuego);
    break;
    case 3:
    autId.className = "visiblx";
    bodyEl.className="fondo";
    pause(videoJuego, audioJuego);
    break;
    case 4:
    refId.className = "visiblx";
    bodyEl.className="fondo";
    pause(videoJuego, audioJuego);
    break;
  }
  // esconder();
}

function start(){
  juegoId.className = "ocultx";
  descrId.className = "ocultx";
  procId.className = "ocultx";
  autId.className = "ocultx";
  refId.className = "ocultx";

}
