/*código del juego*/
window.onload = function(){
  setup();
  gameOn();
}

function cargaContextoCanvas(idCanvas){
  elemento = document.getElementById(idCanvas);
  if(elemento && elemento.getContext){
    ctx = elemento.getContext('2d');
    if(ctx){
      return ctx;
    }
    else {
      alert('Este explorador no es compatible con canvas');
    }
  }
  return 0;
}
function gameOn(){
  setInterval('draw',5);
}
function setup(){
  player=new Player();
  player.show();
}
function draw(){
  borra_todo();
  ctx = cargaContextoCanvas('myCanvas');
  if(ctx){
    console.log("save");
    ctx.save();  // guarda el contexto limpio de efectos
    pelota.update();
  }
}

function borra_todo(){
  ctx = cargaContextoCanvas('myCanvas');
  if(ctx){
    console.log("restore");
    ctx.restore();              // restaura el contexto sin efectos
    ctx.clearRect(0,0,800,500); // borra las figuras
    ctx.save();                 // guarda el contexto limpio de efectos
  }
}
