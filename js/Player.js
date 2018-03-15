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
  this.level=2;
  this.life=Math.floor(minLife+(factor*this.level)/4);
  this.power=Math.round((factor*this.level/4));
  this.hasCollided=false;

  /************************************
  Autor: Alejandro Enrique Trigueros Álvarez
  Fecha: 14/3/18
  Definición: función que mueve el player: actualiza la posición
  *************************************/
  /************************************
  ACTUALIZACIÓN: Sergio Elola García, 15/03/2018
  MEJORA: ahora no puede atravesar muros
  *************************************/

  this.movePlayer=function(){
    var posxNew = this.x + this.speedX;
    var posyNew = this.y + this.speedY;
    var lenPl = this.len;
    if ((!(wallspos.includes((posxNew+1)*multp+posyNew+1))) && // arriba/izquierda
    (!(wallspos.includes((posxNew+lenPl-1)*multp+posyNew+1))) && //arriba/derecha
    (!(wallspos.includes((posxNew+1)*multp+posyNew+lenPl-1))) && // abajo/izquierda
    (!(wallspos.includes((posxNew+lenPl-2)*multp+posyNew+lenPl-1)))) { //abajo/derecha
      this.x+=this.speedX;
      this.y+=this.speedY;
    }
  }
  /************************************
  Autor: Francisco Javier Castellano Farrak
  Fecha: 10/3/18
  Definición: función que dibuja al player
  *************************************/
  this.show=function(){
    ctx = cargaContextoCanvas('myCanvas');
    if(ctx){
      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(this.x,this.y,this.len,this.len);
      ctx.restore();
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
