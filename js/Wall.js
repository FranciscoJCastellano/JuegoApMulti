/************************************
Autor: Francisco Javier Castellano Farrak
Fecha: 10/3/18
Definición: constructor del objeto tipo obstáculo
*************************************/
var maxW=130;
var maxH=100;
var minW=5;
var minH=50;

function Wall(){
  this.x=Math.floor(Math.random()*w-1);
  this.y=Math.floor(Math.random()*h-1);
  this.width=Math.floor(Math.random()*(maxW-minW+1)+minW);
  this.height=Math.floor(Math.random()*(maxH-minH+1)+minH);
  /********************************************
  Autor: Sergio Elola García
  Fecha: 14/03/2018
  Definición: en el posicionamiento de los bloques. No se permiten huecos pequeños
          entre los bloques para que pueda pasar el player.
  *******************************************/
  this.valid = 1;
  if (walls.length != 0){

    var lenMAX = Math.floor(player.len*1.75); // tamaño máximo de espaciado entre 2 bloques
    var i;
    for (i in walls){
      ladoIzq = walls[i]['x'];
      ladoDch = walls[i]['x'] + walls[i]['width'];
      ladoSup = walls[i]['y'];
      ladoInf = walls[i]['y']+ walls[i]['height'];
      ladoIzqNuevo = this.x;
      ladoDchNuevo = this.x + this.width;
      ladoSupNuevo = this.y;
      ladoInfNuevo = this.y + this.height;
      if (((ladoDchNuevo < ladoIzq) && (ladoDchNuevo > ladoIzq - lenMAX)) ||
      ((ladoDch < ladoIzqNuevo) && (ladoIzqNuevo < ladoDch + lenMAX))) {

        if ((ladoInfNuevo > ladoSup - lenMAX) && (ladoSupNuevo < ladoInf + lenMAX)) {
          this.valid = 0;
        }
      }
      if (((ladoInfNuevo < ladoSup) && (ladoInfNuevo > ladoSup - lenMAX)) ||
      ((ladoInf < ladoSupNuevo) && (ladoSupNuevo < ladoInf + lenMAX))){

        if ((ladoDchNuevo > ladoIzq - lenMAX) && (ladoIzqNuevo < ladoDch + lenMAX)) {
          this.valid = 0;
        }
      }
    }
  }

  /************************************
  Autor: Francisco Javier Castellano Farrak
  Fecha: 10/3/18
  Definición: función que dibuja un obstáculo pared
  *************************************/
  this.show=function(){
    ctx = cargaContextoCanvas('myCanvas');
    if(ctx){
      ctx.fillStyle = randomRgb;
      ctx.fillRect(this.x,this.y,this.width,this.height);
      ctx.fill();
    }
  }
}
