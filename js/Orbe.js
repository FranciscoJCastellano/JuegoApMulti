/************************************
Autor: Alejandro Trigueros
Fecha: 21/3/18
Definición: constructor del objeto Orbe
*************************************/
function Orbe(){
  this.x=0;
  this.y=0;
  this.r=10;
  this.a=Math.random()*w-1+this.r;
  this.b=Math.random()*h-1+this.r;
  this.x=this.a-this.r-1;
  this.y=this.b-this.r-1;
  this.len=2*this.r;
  this.prize=5;

  this.show=function(){
    ctx = cargaContextoCanvas('myCanvas');
    if(ctx){
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = "#ee9900";
      ctx.shadowBlur=10;
      ctx.shadowColor="ffffff";
      ctx.arc(this.a,this.b,this.r,0,2*Math.PI);//context.arc(x,y,r,sAngle,eAngle,counterclockwise);
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
  }

  /************************************
  Autor: Sergio Elola
  Fecha: 29/3/18
  Definición: devolver TRUE si el orbe coincide con algún muro
  *************************************/
  this.coincideConWall=function(){
    var i=0;
    for(i ; i <= walls.length-1;i++){

      wallx = walls[i].x;
      wallxmax = wallx + walls[i].width;
      wally = walls[i].y;
      wallymax = wally + walls[i].height

      if ( (((this.x-this.r-this.len) >= wallx) && (this.x <= wallxmax)) ||
      (((this.y-this.r-this.len)>= wally) && (this.y <= wallymax)) ) {
      //if (this.a < walls[i].x+walls[i].width
      //&& this.b < walls[i].y+walls[i].height
      //&& this.a > walls[i].x && this.b > walls[i].y) {
        return true
      }
    }
    return false;
  }
}
