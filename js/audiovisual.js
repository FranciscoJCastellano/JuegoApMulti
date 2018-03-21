/************************************
Autor: Jaime Moreno Quintanar
Fecha: 14/03/2018
Definición: Archivo para implementar funciones relacionadas con controlar el juego desde el video
importante para subir el nivel cuando se sobreviva a la noche con el video y se haga de dia
Referencias: https://www.w3schools.com/tags/ref_av_dom.asp
*************************************/
var videoIsEnded = 0; //Si 1 --> vídeo terminado. Si 0 --> video no terminado
var primerPlay = 0; //Si 0, no se ha pulsado play todavía. Si 1, se ha pulsado play una vez
var videoJuego;//video del juego
var audioJuego;//audio de juego
var load=false;//se ha cargado la pagina?
function alerta (texto) {
	// console.log("Evento Capturado: " + texto);
}
/*Inicializar audio y video*/
function init(){
	videoJuego = document.getElementById("video");
	audioJuego = document.getElementById("audio");
	load=true;
}
document.addEventListener("DOMContentLoaded", init, false);

/*Devuelve el vídeo*/
function getVideo() {
	return videoJuego;
}
/*Devuelve el audio*/
function getAudio(){
	return audioJuego;
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
	gameIsOn=true;//reanuda el juego
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
	gameIsOn=false;//para el juego
	video.pause();
	audio.pause();
}
/*********
Fecha: 17/3/18
Definición: función para cambiar de noche a día
*************************************/
function changeTime(video){
	if(isDay){
		isDay=!isDay;
		console.log("Noche");
		audio.currentTime=15;
		video.currentTime=15;
	}else if(!isDay){
		isDay=!isDay;
		console.log("Día");
		audio.currentTime=0;
		video.currentTime=0;
	}
}

function instante(video){
	if(video){
		//console.log(video.currentTime);
		if (isDay&&video.currentTime>=umbral1){//Termina el día y empieza la noche
			isDay=!isDay;
		}else if (!isDay&&video.currentTime>=umbral2){//Termina el noche y empieza la noche
			isDay=!isDay;
			if(!levelChange){
				level++;
				levelChange=false;
				setup();
			}
		}
	}
}
