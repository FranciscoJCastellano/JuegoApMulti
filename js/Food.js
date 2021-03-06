/************************************
Autor: Francisco Javier Castellano Farrak
Fecha: 14/3/18
Definición: constructor del objeto tipo para la comida que debe recoger el jugador
*************************************/
function Food(){
  this.x=Math.random()*w-1;
  this.y=Math.random()*h-1;
  this.len=7;
  this.minVel=3;
  this.maxVel=5;
  this.hasCollided=false;
  this.limiterFactor=2*0.08;
  this.velx=0;
  this.vely=0;
  this.prize=1;
  //generamos num aleatorio para la dirección inicial
  if(this.vely==0){
    random=Math.floor(Math.random()*(3)-1);
    this.velx=Math.floor(((-1)^random)*Math.random()*(this.maxVel-this.minVel+1)+this.minVel)*this.limiterFactor;
  }
  if(this.vely==0){
    random=Math.floor(Math.random()*(3)-1);
    this.vely=Math.floor(((-1)^random)*Math.random()*(this.maxVel-this.minVel+1)+this.minVel)*this.limiterFactor;
  }

  /************************************
  Autor: Francisco Javier Castellano Farrak
  Fecha: 14/3/18
  Definición: función que dibuja la comida
  *************************************/
  this.show=function(){

    ctx = cargaContextoCanvas('myCanvas');
    this.update();

    if(ctx){
      ctx.save();
      ctx.fillStyle = '#7a00cc';
      ctx.fillRect(this.x,this.y,this.len,this.len);
      ctx.restore();
    }
  }
  /************************************
  Autor: Francisco Javier Castellano Farrak
  Fecha: 14/3/18
  Definición: función que actualiza la posición de la comida
  *************************************/
  this.update=function(){
    if(this.velx==0){
      random=Math.floor(Math.random()*(3)-1);
      this.velx=Math.floor(((-1)^random)*Math.random()*(this.maxVel-this.minVel+1)+this.minVel)*this.limiterFactor;
    }
    if(this.vely==0){
      random=Math.floor(Math.random()*(3)-1);
      this.vely=Math.floor(((-1)^random)*Math.random()*(this.maxVel-this.minVel+1)+this.minVel)*this.limiterFactor;
    }
    if(this.velx>velMax){
      this.velx=velMax;
    }
    if(this.vely>velMax){
      this.vely=velMax;
    }
    this.x+=this.velx;
    this.y+=this.vely;
    this.colision();
  }

  /************************************
  Autor: Francisco Javier Castellano Farrak
  Fecha: 14/3/18
  Definición: deteccion de colisiones de la comida
  *************************************/
  this.colision=function(){
    if(this.y>=h-this.len/2||this.y<=-this.len/2){//bottom threshold
      this.vely=-this.vely;
    }
    if(this.x>=w-this.len/2||this.x<=-this.len/2){//bottom threshold
      this.velx=-this.velx;
    }
  }


}
