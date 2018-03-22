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
      if(isDay){
        this.color="#000000";
      }else if(!isDay){
        this.color="#ffffff";
      }
      ctx.shadowBlur=15;
      ctx.shadowColor='#BEFDFD';
      ctx.fillStyle = this.color;

      ctx.fillRect(this.x,this.y,this.len,this.len);
      ctx.restore();
    }
    if(this.tic==0){
      this.len=20;
    }
    this.tic--;

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
      //this.color="#ff002f";
      this.tic=5;
        // ctx.save();
        // ctx.fillStyle = "#ff002f";
        // ctx.fillRect(this.x,this.y,sizeFactor*this.len,sizeFactor*this.len);
        // ctx.restore();
    }else if(food&&isDay){
      //console.log("food colourChange");
      this.len*=sizeFactor;
    //  this.color="#1fefff";
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
  /************************************
  Autor: Sergio Elola
  Fecha: 21/03/18
  Definición: ya no se fastidia si hay un muro al otro lado
  *************************************/
  this.colision=function(){

    if((this.y+this.len)>=h){//bottom threshold
      if((!(wallspos.includes(this.x*multp+this.len)))
      && (!(wallspos.includes((this.x+this.len)*multp+this.len)))) {
        this.y = 1;
      }else{
        this.y = h-this.len;
      }
    }
    if(this.y<=0){//top threshold
      if((!(wallspos.includes(this.x*multp+h-this.len)))
      && (!(wallspos.includes((this.x+this.len)*multp+h-this.len)))) {
        this.y=h-this.len;
      }else{
        this.y = 0;
      }
    }
    if((this.x+this.len)>=w){//right threshold
      if((!(wallspos.includes(this.len*multp+this.y)))
      && (!(wallspos.includes(this.len*multp+this.y+this.len)))) {
        this.x=1;
      }else{
        this.x = w-this.len;
      }
    }
    if(this.x<=0){//left threshold
      if((!(wallspos.includes((w-this.len)*multp+this.y)))
      && (!(wallspos.includes((w-this.len)*multp+this.y+this.len)))) {
        this.x=w-this.len;
      }else{
        this.x = 0;
      }
    }
  }
}
