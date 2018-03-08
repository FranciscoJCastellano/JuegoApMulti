var w=800;
var h=500;
var step=5;
var len=10;
function Player(){
  this.x=0;
  this.y=0;
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
