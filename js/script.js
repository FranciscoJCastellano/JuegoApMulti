/*código del juego*/
var step=5;
var enemies=[];
var walls=[];
var factor=5;//factor de dificultad para generar enemigos y obstáculos.
var w=800;
var h=500;
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
function borra_todo(){
  ctx = cargaContextoCanvas('myCanvas');
  if(ctx){
    //console.log("restore");
    ctx.restore();              // restaura el contexto sin efectos
    ctx.clearRect(0,0,800,500); // borra las figuras
    ctx.save();                 // guarda el contexto limpio de efectos
  }
}

window.onload = function(){
  setup();
  gameOn();
}
function gameOn(){
  setInterval(draw,10);
  //alert("GAME ON");
}
/*Guardamos el contexto sin nada y dibujamos al jugadxr en la posicion inicial*/
function setup(){
  player=new Player();

  for(var i=0;i<factor*player.level;i++){
    walls.push(new Wall);
  }
  for(var i=0;i<player.level*factor/2;i++){
    enemies.push(new Enemy);
  }
  window.addEventListener('keydown', function(e){
    e.preventDefault();
    listenKeyPressed(e.keyCode);
  },true);//Evento:se pulsa una tecla

  ctx = cargaContextoCanvas('myCanvas');
  if(ctx){
    //console.log("save");
    ctx.save();  // guarda el contexto limpio de efectos

    //dibuja cada obstáculo
    for(var i=walls.length-1;i>=0;i--){
      walls[i].show();
    }
    //dibuja y actualiza la posición de cada enemigo
    for(var i=enemies.length-1;i>=0;i--){
      enemies[i].update();
      enemies[i].show();
    }
    player.show();

  }
}
/************************************
Autores: Alejandro Enrique Trigueros Álvarez y Francisco Javier Castellano Farrak
Fecha: 10/3/18
Definición: borramos canvas y redibujamos player, enemigo y obstáculos
*************************************/
function draw(){
  ctx = cargaContextoCanvas('myCanvas');
  if(ctx){

    borra_todo();
    player.colision();
    player.show();
    comer(player,enemies);

    for(var i=enemies.length-1;i>=0;i--){
      enemies[i].show();
      enemies[i].update();
    }
    //dibuja
    //  for(var i=walls.length-1;i>=0;i--){
    //    walls[i].show();
    // }

  }

}
/************************************
Autor: Francisco Javier Castellano Farrak
Fecha: 13/3/18
Definición: función para ver si el player y el enemigo están en la misma posición
Ref:https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
*************************************/
function comer(player,enemies){
  for(var i=enemies.length-1;i>=0;i--){
    if(player.hasCollided==false){
      if (coincide(player,enemies[i])){
        if(i>-1){
          enemies.splice(i,1);
        }
        player.hasCollided=true;
        player.score++;
        console.log(player.score);
      }
    }else if(player.hasCollided==true&&!coincide(player,enemies[i])){
        player.hasCollided=false;
    }
  }
}
function coincide(player,enemy){
  var coincide=player.x < enemy.x + enemy.len &&
  player.x + player.len > enemy.x &&
  player.y < enemy.y + enemy.len &&
  player.len + player.y > enemy.y;
  return coincide;
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
    alert("Eres un pipa :3");
  }


}
