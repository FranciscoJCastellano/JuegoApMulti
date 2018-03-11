/************************************
Autor: Francisco Javier Castellano Farrak
Fecha: 10/3/18
Definición: constructor del objeto tipo para los enemigos
*************************************/
var w=800;
var h=500;
var step=5;
var len=10;
function Player(){
  this.x=0;
  this.y=0;
  this.radio=10;

  /*función que dibuja el jugador en el canvas*/
  this.show=function(){
    ctx = cargaContextoCanvas('myCanvas');
    if(ctx){
      ctx.fillStyle = '#ffffff';
      ctx.rect(this.x,this.y,len,len);
      ctx.fill();
    }
  }
  /*función que se encarga alterar el movimiento de los enemigos*/
  this.update=function(){
    this.x=this.x+step;
    this.y=this.y+step;
    this.show();
  }
}
