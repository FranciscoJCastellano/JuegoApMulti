/************************************
Autor: Francisco Javier Castellano Farrak
Fecha: 10/3/18
Definición: constructor del objeto tipo para los enemigos
*************************************/
function Enemy(){
  this.x=Math.random()*w-1;
  this.y=Math.random()*h-1;
  this.len=10;
  this.through=false;//propiedad para atravesar las paredes
  this.minVel=2;
  this.maxVel=2.5;
  this.limiter=0.67*level;
  this.prize=2;
  if(this.limiter> this.maxVe){
    this.limiter= this.maxVe;
  }
  this.life=Math.floor(minLife+factor*2);
  this.power=Math.floor(factor*0.37);
  this.velx=0;
  this.vely=0;
  random=Math.floor(Math.random()*(3)-1);

  //generamos num aleatorio para la dirección inicial
  if(this.vely==0){
    random=Math.floor(Math.random()*(3)-1);
    this.velx=Math.floor(((-1)^random)*Math.random()*(this.maxVel-this.minVel+1)+this.minVel)*this.limiter;
  }
  random=Math.floor(Math.random()*(3)-1);

  if(this.vely==0){
    random=Math.floor(Math.random()*(3)-1);
    this.vely=Math.floor(((-1)^random)*Math.random()*(this.maxVel-this.minVel+1)+this.minVel)*this.limiter;
  }
  /************************************
  Autor: Francisco Javier Castellano Farrak
  Fecha: 10/3/18
  Definición: función que dibuja al enemigo
  *************************************/
  this.show=function(){
    ctx = cargaContextoCanvas('myCanvas');
    this.update();

    if(ctx){
      ctx.save();
      ctx.fillStyle = '#4501ff';
      ctx.fillRect(this.x,this.y,this.len,this.len);
      ctx.restore();
    }
  }
  /************************************
  Autor: Francisco Javier Castellano Farrak
  Fecha: 10/3/18
  Definición: función que actualiza la posición del enemigo
  *************************************/
  this.update=function(){
    if(this.velx==0){
      random=Math.floor(Math.random()*(3)-1);
      this.velx=Math.floor(((-1)^random)*Math.random()*(this.maxVel-this.minVel+1)+this.minVel)*this.limiter;
    }
    if(this.vely==0){
      random=Math.floor(Math.random()*(3)-1);
      this.vely=Math.floor(((-1)^random)*Math.random()*(this.maxVel-this.minVel+1)+this.minVel)*this.limiter;
    }
    if(this.velx>1.23*velMax){
      this.velx=1.23*velMax;
    }
    if(this.vely>1.23*velMax){
      this.vely=1.23*velMax;
    }
    this.x+=this.velx;
    this.y+=this.vely;
    this.colision();
  }

  /************************************
  Autor: Francisco Javier Castellano Farrak
  Fecha: 12/3/18
  Definición: deteccion de colisiones de los enemigos
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
