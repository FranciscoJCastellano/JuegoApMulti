/************************************
Autor: Jaime Moreno Quintanar
Fecha: 14/03/2018
Definición: Archivo para implementar funciones relacionadas con controlar el juego desde el video
importante para subir el nivel cuando se sobreviva a la noche con el video y se haga de dia
Referencias: https://www.w3schools.com/tags/ref_av_dom.asp
*************************************/
var videoIsEnded = 0; //Si 1 --> vídeo terminado. Si 0 --> video no terminado
var primerPlay = 0; //Si 0, no se ha pulsado play todavía. Si 1, se ha pulsado play una vez
var video = document.getElementById("video");

function alerta (texto) {
	console.log("Evento Capturado: " + texto);
}
/*Inicializar audio y video*/
function init(){
	document.video = document.getElementById("video");
	document.audio = document.getElementById("audio");
}
document.addEventListener("DOMContentLoaded", init, false);

/*Devuelve el vídeo*/
function getVideo() {
	return document.video;
}
/*Devuelve el audio*/
function getAudio(){
	return document.audio;
}

function isEnded(video){
	if (video.ended == true){
		console.log("Ended");
		videoIsEnded = 1;

	}else {
		console.log("Not ended");
	}
}

/*Función para reproducir el vídeo y el audio al pulsar el play y empezar el juego*/
function play(video, audio){
	if (!primerPlay){
		primerPlay=1;
		video.play();//El vídeo comienza
		audio.play();//El audio comienza
		gameOn();//Función creada en script.js que pone a funcionar el juego
	}else{
		video.play();
		audio.play();
	}
}
/*Pausa el video y el audio*/
function pause(video, audio){
	video.pause();
	audio.pause();
}

/*Función para reproducir el vídeo al pulsar el play y empezar el juego*/
function changeTime(video){
	if(primerPlay){
		isDay = !isDay;
		video.play();//El vídeo comienza
		gameOn();//Función creada en script.js que pone a funcionar el juego
	}
}

/*Devuelve el tiempo actual del video*/
video.ontimeupdate = function(){currentTime()};
function currentTime(){
	if (video.currentTime>=15){//Termina el día y empieza la noche
		changeTime(video);
		console.log("Noche");
	}else{
		changeTime(video);
		console.log("Día");
	}
}
