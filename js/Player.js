/************************************
Autor: Francisco Javier Castellano Farrak
Fecha: 10/3/18
Definición: constructor del objeto player
*************************************/
var minLife=10;
function Player(){
  this.x=50;
  this.y=50;
  this.speedX = 0;
  this.speedY = 0;
  this.len=20;
  this.score=0;
  this.level=level;
  this.life=Math.floor(2*minLife+(factor*this.level*0.3)*0.23);
  this.power=Math.round((factor*this.level*0.4));
  this.hasCollided=false;
  this.ammo=this.level*factor;
  this.color='#fff';
  this.tic=0;

  /************************************
  Autor: Alejandro Enrique Trigueros Álvarez
  Fecha: 14/3/18
  Definición: función que mueve el player: actualiza la posición
  *************************************/
  /************************************
  Autor: Sergio Elola García
  Fecha: 15/03/2018
  MEJORA: ahora no puede atravesar muros
  *************************************/

  this.movePlayer=function(){
    /*Ahora usamos una función que devuelve un boolean si se detecta la pared*/
    if(detectarWall(this)){
      player.x+=player.speedX;
      player.y+=player.speedY;
    }

  }
  /************************************
  Autor: Francisco Javier Castellano Farrak
  Fecha: 10/3/18
  Definición: función que dibuja al player
  *************************************/
  this.show=function(){
    ctx = cargaContextoCanvas('myCanvas');
    this.colision();
    if(ctx){
      ctx.save();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x,this.y,this.len,this.len);
      ctx.restore();

      if(this.tic==0){
        this.color='#ffffff';
        this.len=20;
      }
      this.tic--;

    }
  }
  /************************************
  Autor: Francisco Javier Castellano Farrak
  Fecha: 16/3/18
  Definición: función que cambia el color al player
  *************************************/
  this.colourChange=function(food){
    var sizeFactor=1.3;
    ctx = cargaContextoCanvas('myCanvas');
    if(!food&&!isDay){
      this.len*=sizeFactor*0.78;
      this.color="#ff002f";
      this.tic=5;
        // ctx.save();
        // ctx.fillStyle = "#ff002f";
        // ctx.fillRect(this.x,this.y,sizeFactor*this.len,sizeFactor*this.len);
        // ctx.restore();
    }else if(food&&isDay){
      //console.log("food colourChange");
      this.len*=sizeFactor;
      this.color="#1fefff";
      this.tic=5;


        // ctx.save();
        // ctx.fillStyle = "#1fefff";
        // ctx.fillRect(this.x,this.y,sizeFactor*this.len,sizeFactor*this.len);
        // ctx.restore();
    }
  }

  /************************************
  Autor: Francisco Javier Castellano Farrak
  Fecha: 10/3/18
  Definición: función para cambiar posición del jugador al llegar al final del canvas
  *************************************/
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
