/************************************
Autor: Francisco Javier Castellano Farrak
Fecha: 10/3/18
Definición: constructor del objeto tipo obstáculo
*************************************/

var maxW=120;
var maxH=200;
var minW=10;
var minH=10;

function Wall(){
  this.x=Math.random()*w-1;
  this.y=Math.random()*h-1;
  this.width=Math.floor(Math.random()*(maxW-minW+1)+minW);
  this.height=Math.floor(Math.random()*(maxH-minH+1)+minH);;

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
