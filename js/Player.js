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
  this.life=Math.floor(2*minLife+(this.level*0.3)*0.23);
  this.power=Math.round((factor*this.level*0.4));
  this.hasCollided=false;
  this.ammo=this.level*factor;//posible mejora: añadir proyectiles
  this.color='#ffffff';
  this.tic=0;

  /************************************
  Autor: Alejandro Enrique Trigueros Álvarez
  Fecha: 14/3/18
  Definición: función que mueve el player: actualiza la posición
  *************************************/
  /************************************
  Autor: Sergio Elola García
  Fecha: 15/03/2018
  MEJORA: ahora el player no puede atravesar muros
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
      ctx.shadowBlur=15;
      ctx.shadowColor='#BEFDFD';
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x,this.y,this.len,this.len);
      ctx.restore();
    }
    if(this.tic<=0){
      this.resetColor();
    }
    this.tic--;
  }
  this.resetColor=function() {
    if(isDay){
      this.len=20;
      this.color="#000000";
    }else if(!isDay){
      this.color="#ffffff";
      this.len=20;
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
      console.log("Enemy colourChange");
      this.color="#ff0000";
      this.len*=sizeFactor*0.75;
      this.tic=8;
    }else if(food&&isDay){
      console.log("Food colourChange");
      this.color='#00ffaa';
      this.len*=sizeFactor;
      this.tic=10;
    }else if (food&& !isDay) {
      console.log("Orbe colourChange");
      this.color='#00ffaa';
      this.len*=sizeFactor;
      this.tic=10;
    }
  }

  /************************************
  Autor: Francisco Javier Castellano Farrak
  Fecha: 10/3/18
  Definición: función para cambiar posición del jugador al llegar al final del canvas

  Autor: Sergio Elola
  Fecha: 21/03/18
  MEJORA: ahora no se queda bloqueado el player si hay un muro al otro lado
  *************************************/
  this.colision=function(){

    if((this.y+this.len)>=h){//bottom threshold
      if((!(wallspos.includes(this.x*multp+this.len)))
      && (!(wallspos.includes((this.x+this.len)*multp+this.len)))
      && (!(wallspos.includes(this.x*multp))) // si se crean muros finos
      && (!(wallspos.includes((this.x+this.len)*multp)))) { // si se crean muros finos
        this.y = 1; // si se puede mover al otro lado
      }else{
        this.y = h-this.len; //si no se puede mover al otro lado
      }
    }
    if(this.y<=0){//top threshold
      if((!(wallspos.includes(this.x*multp+h-this.len)))
      && (!(wallspos.includes((this.x+this.len)*multp+h-this.len)))
      && (!(wallspos.includes(this.x*multp+h))) // si se crean muros finos
      && (!(wallspos.includes((this.x+this.len)*multp+h)))) { // si se crean muros finos
        this.y=h-this.len; // si se puede mover al otro lado
      }else{
        this.y = 0; //si no se puede mover al otro lado
      }
    }
    if((this.x+this.len)>=w){//right threshold
      if((!(wallspos.includes(this.len*multp+this.y)))
      && (!(wallspos.includes(this.len*multp+this.y+this.len)))
      && (!(wallspos.includes(this.y))) // si se crean muros finos
      && (!(wallspos.includes(this.y+this.len)))) { // si se crean muros finos
        this.x=1; // si se puede mover al otro lado
      }else{
        this.x = w-this.len; //si no se puede mover al otro lado
      }
    }
    if(this.x<=0){//left threshold
      if((!(wallspos.includes((w-this.len)*multp+this.y)))
      && (!(wallspos.includes((w-this.len)*multp+this.y+this.len)))
      && (!(wallspos.includes(w*multp+this.y))) // si se crean muros finos
      && (!(wallspos.includes(w*multp+this.y+this.len)))) { // si se crean muros finos
        this.x=w-this.len; // si se puede mover al otro lado
      }else{
        this.x = 0; //si no se puede mover al otro lado
      }
    }
  }
}
