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
  this.maxVel=5;
  this.limiter=0.4;
  this.life=Math.floor(minLife+factor*2);
  this.power=Math.floor(factor*0.3);
  this.velx=Math.floor(Math.random()*(this.maxVel-this.minVel+1)+this.minVel)*this.limiter;
  this.vely=Math.floor(Math.random()*(this.maxVel-this.minVel+1)+this.minVel)*this.limiter;

  /************************************
  Autor: Francisco Javier Castellano Farrak
  Fecha: 10/3/18
  Definición: función que dibuja al enemigo
  *************************************/
  this.show=function(){
    ctx = cargaContextoCanvas('myCanvas');
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
    //si pierdes recarga la pagina

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
