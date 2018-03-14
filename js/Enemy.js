/************************************
Autor: Francisco Javier Castellano Farrak
Fecha: 10/3/18
Definición: constructor del objeto tipo para los enemigos
*************************************/
var w=800;
var h=500;
var minVel=2;
var maxVel=5;
var limiter=0.32;
function Enemy(){
  this.x=Math.random()*w-1;
  this.y=Math.random()*h-1;
  this.len=5;
  this.velx=Math.floor(Math.random()*(maxVel-minVel+1)+minVel)*limiter;
 this.vely=Math.floor(Math.random()*(maxVel-minVel+1)+minVel)*limiter;

  /*dibuja un enemigo*/
  this.show=function(){

    ctx = cargaContextoCanvas('myCanvas');
    if(ctx){
      //alert("player show");
      ctx.fillStyle = '#000000';
      ctx.fillRect(this.x,this.y,this.len,this.len);

    }
  }
/*actualiza la posicion del enemigo*/
  this.update=function(){

    this.x+=this.velx;
    this.y+=this.vely;
    this.colision();
  }

  /*deteccion de colisiones de los enemigos*/
  this.colision=function(){
    if(this.y>=h-this.len/2||this.y<=-this.len/2){//bottom threshold
      this.vely=-this.vely;
    }
    if(this.x>=w-this.len/2||this.x<=-this.len/2){//bottom threshold
      this.velx=-this.velx;
    }
  }


  }
