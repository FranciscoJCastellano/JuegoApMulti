/*funciones paraorganizar pestañas y demás acciones ajenas al juego*/
var juegoId;
var descrId;
var procId;
var autId;
var refId;
var menu;
var data;
function ver(){
  menu.style.display="block";
  data.style.display="none";
}
function esconder(){
  menu.style.display="none";
  data.style.display="block";
}
function initIds(){
  menu=document.getElementById("menu");
  data=document.getElementById("dataJuego");

  juegoId=document.getElementById("juego");
  descrId=document.getElementById("descripcion");
  procId=document.getElementById("proceso");
  autId=document.getElementById("autores");
  refId=document.getElementById("referencias");
}
document.addEventListener("DOMContentLoaded", initIds, false);



function hacerVisible(idEl){

  start();
  if(idEl<0||idEl>5){
    alert("xddd");
    idEl=0;
  }
  switch(idEl){
    case 0:
    juegoId.className = "visiblx";
    play(videoJuego, audioJuego);
    break;
    case 1:
    descrId.className = "visiblx";
    pause(videoJuego, audioJuego);
    break;
    case 2:
    procId.className = "visiblx";
    pause(videoJuego, audioJuego);
    break;
    case 3:
    autId.className = "visiblx";
    pause(videoJuego, audioJuego);
    break;
    case 4:
    refId.className = "visiblx";
    pause(videoJuego, audioJuego);
    break;
  }
  esconder();
}

function start(){
  juegoId.className = "ocultx";
  descrId.className = "ocultx";
  procId.className = "ocultx";
  autId.className = "ocultx";
  refId.className = "ocultx";

}
