/************************************
Autor: Alejandro Trigueros
Fecha: 21/3/18
Definición: constructor del objeto Orbe
*************************************/
function Orbe(){
  this.x=50;
  this.y=50;
  this.r=10;
  this.a=Math.random()*w-1+this.r;
  this.b=Math.random()*h-1+this.r;
  this.x=this.a-this.r-1;
  this.y=this.b-this.r-1;
  this.len=2*this.r;
  this.show=function(){
    ctx = cargaContextoCanvas('myCanvas');
    if(ctx){
      ctx.save();
      ctx.beginPath();
      ctx.shadowBlur=10;
      ctx.shadowColor="ffffff";
      ctx.fillStyle = "#ee9900";
      ctx.arc(this.a,this.b,this.r,0,2*Math.PI);//context.arc(x,y,r,sAngle,eAngle,counterclockwise);
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
  }
}
