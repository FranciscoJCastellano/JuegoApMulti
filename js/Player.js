var w=800;
var h=500;
var step=10;
function Player(){
  this.x=50;
  this.y=50;
  this.len=20;
  this.velocity=0;

  this.show=function(){

    ctx = cargaContextoCanvas('myCanvas');
    if(ctx){
        //alert("player show");
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(this.x,this.y,this.len,this.len);

    }
  }

/*
  this.update=function(){
    this.velocity=step;
    this.velocity*=0.92;
    this.y+=this.velocity;
    //this.x+=this.velocity;
    if(this.y>h){//bottom threshold
      this.y=0;
      this.velocity=0;
    }
    if(this.y<0){//top threshold
      this.y=h;
      this.velocity=0;
    }
    if(this.x>w){//bottom threshold
      this.x=0;
      this.velocity=0;
    }
    if(this.x<0){//top threshold
      this.x=w;
      this.velocity=0;
    }
  }
  */

}
