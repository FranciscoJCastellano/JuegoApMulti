/************************************
Autor: Francisco Javier Castellano Farrak
Fecha: 10/3/18
Definición: constructor del objeto player
*************************************/
var w=800;
var h=500;
function Player(){
  this.x=50;
  this.y=50;
  this.speedX = 0;
  this.speedY = 0;
  this.len=20;
  this.score=0;
  this.level=5;

  /*funcion que mueve el player: actualiza la posicion*/
  this.movePlayer=function(){
    this.x+=this.speedX;
    this.y+=this.speedY;
  }
  /*funcion que dibuja el player*/
  this.show=function(){

    ctx = cargaContextoCanvas('myCanvas');
    if(ctx){
      //alert("player show");
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(this.x,this.y,this.len,this.len);

    }
  }

  /*funcion para cambiar posicion del jugador al llegar al final del canvas*/
  this.colision=function(){
    if(this.y>=h-this.len/2){//bottom threshold
      this.y=0;
    }
    if(this.y<=-this.len/2){//top threshold
      this.y=h-this.len;
    }
    if(this.x>=w-this.len/2){//bottom threshold
      this.x=0;
    }
    if(this.x<=-this.len/2){//top threshold
      this.x=w-this.len;
    }
  }


}
