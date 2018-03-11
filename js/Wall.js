/************************************
Autor: Francisco Javier Castellano Farrak
Fecha: 10/3/18
Definición: constructor del objeto tipo obstáculo
*************************************/
var w=800;
var h=500;
function Wall(){
  this.x=w/2;
  this.y=h/3;
  this.width=70;
  this.height=10;

  /*función que dibuja los obstáculos en el canvas*/
  this.show=function(){
    ctx = cargaContextoCanvas('myCanvas');
    if(ctx){
      ctx.fillStyle = '#ffffff';
      ctx.rect(this.x,this.y,this.width,this.height);
      ctx.fill();
    }
  }

}
