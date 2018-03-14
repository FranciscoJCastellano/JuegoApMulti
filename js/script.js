/*código del juego*/
var step=15;
var enemies=[];
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
  setInterval(draw,10);
  //alert("GAME ON");
}
/*Guardamos el contexto sin nada y dibujamos al jugadxr en la posicion inicial*/
function setup(){
  player=new Player();
  //enemy=new Enemy();
  enemies.push(new Enemy);

  window.addEventListener('keydown', function(e){
    e.preventDefault();
    listenKeyPressed(e.keyCode);
  },true);//Evento:se pulsa una tecla

  ctx = cargaContextoCanvas('myCanvas');
  if(ctx){
    //console.log("save");
    ctx.save();  // guarda el contexto limpio de efectos
    player.show();
    //enemy.show();
    for(var i=enemies.length-1;i>=0;i--){
      enemies[i].show();
      enemies[i].update();
    }
  }
}
/*borramos el canvas y dibujamos de nuevo al player*/
function draw(){
  ctx = cargaContextoCanvas('myCanvas');
  if(ctx){

    borra_todo();
    player.colision();
    player.show();
    for(var i=enemies.length-1;i>=0;i--){
      comer(player,enemies[i]);

      enemies[i].show();
      enemies[i].update();
    }
    if(enemies.length<player.level){
      enemies.push(new Enemy);
    }
    if(player.score>1){
      console.log(player.score);

    }
  }

}
function borra_todo(){
  ctx = cargaContextoCanvas('myCanvas');
  if(ctx){
    //console.log("restore");
    ctx.restore();              // restaura el contexto sin efectos
    ctx.clearRect(0,0,800,500); // borra las figuras
    ctx.save();                 // guarda el contexto limpio de efectos
  }
}

/*funcion para ver si el player y el enemigo están en la misma posicion*/
function comer(player,enemy){
  if(player.x===enemy.x&&player.y===enemy.y){
    player.score++;
  }
}



function listenKeyPressed(key){
  //Esta funcion se ejecuta al pulsar una tecla
  //mirar setup()
  player.speedX=0;
  player.speedY=0;
  if(key==40){//abajo
    player.speedY = step;
  }
  if(key==39){//derecha
    player.speedX = step;
  }
  if(key==38){//arriba
    player.speedY= -step;
  }
  if(key==37){//izquierda
    player.speedX= -step;
  }
  player.movePlayer();
  if(key==32){//ESPACIO
    alert("eres un pipa :3");
  }
}
