/************************************
Autor: Jaime Moreno Quintanar
Fecha: 14/03/2018
Definición: Archivo para implementar funciones relacionadas con controlar el juego desde el video
importante para subir el nivel cuando se sobreviva a la noche con el video y se haga de dia
Referencias: https://www.w3schools.com/tags/ref_av_dom.asp
*************************************/
var videoIsEnded = 0; //Si 1 --> vídeo terminado. Si 0 --> video no terminado

function alerta (texto) {
	console.log("Evento Capturado: " + texto);
}

function init(){
	document.video = document.getElementById("video");
}
document.addEventListener("DOMContentLoaded", init, false);

function getVideo() {
	return document.video;
}
function isEnded(video){
	if (video.ended == true){
		console.log("Ended");
		videoIsEnded = 1;
	}else {
		console.log("Not ended");
	}
}