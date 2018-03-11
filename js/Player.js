/************************************
Autor: Francisco Javier Castellano Farrak
Fecha: 10/3/18
Definición: constructor del objeto jugador
*************************************/
var w=800;
var h=500;
var step=10;
function Player(){
  this.x=w/2;
  this.y=h/2;
  this.len=20;
  this.velocity=0;

  /*función que dibuja el jugador en el canvas*/
  this.show=function(){
    ctx = cargaContextoCanvas('myCanvas');
    if(ctx){
      ctx.fillStyle = '#ffffff';
      ctx.rect(this.x,this.y,this.len,this.len);
      ctx.fill();
    }
  }
  /*función que se encarga alterar el movimiento del jugador*/

  //nota: una vez esté implementado para coger eventos de
  //flechas del teclado esto sería distinto

  this.update=function(){
    this.velocity=step;
    this.velocity*=0.92;
    this.y+=this.velocity;
    //this.x+=this.velocity;
    if(this.y>h){//bottom threshold
      this.y=0;
      this.velocity=0;
    }
    if(this.y<0){//top threshold
      this.y=h;
      this.velocity=0;
    }
    if(this.x>w){//bottom threshold
      this.x=0;
      this.velocity=0;
    }
    if(this.x<0){//top threshold
      this.x=w;
      this.velocity=0;
    }
  }

}
