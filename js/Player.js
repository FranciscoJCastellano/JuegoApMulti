var w=800;
var h=500;
var step=10;
var len=20;
function Player(){
  this.x=w/2;
  this.y=h/2;
  this.radio=10;
  this.show=function(){
    ctx = cargaContextoCanvas('myCanvas');
    if(ctx){
      ctx.fillStyle = '#ffffff';
      ctx.rect(this.x,this.y,len,len);
      ctx.fill();
    }
  }
  this.update=function(){
    this.x=this.x+step;
    this.y=this.y+step;
    this.show();
  }
}
