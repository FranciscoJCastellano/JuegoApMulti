/*código del juego*/
var step=15;
var enemies=[];
var walls=[];
var factor=5;//factor de dificultad para generar enemigos y obstáculos.

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
  //enemy=new Enemy();
  enemies.push(new Enemy);
  for(var i=0;i<factor*player.level;i++){
    walls.push(new Wall);
  }
  window.addEventListener('keydown', function(e){
    e.preventDefault();
    listenKeyPressed();
  },true);//Evento:se pulsa una tecla
  ctx = cargaContextoCanvas('myCanvas');
  if(ctx){
    //console.log("save");
    ctx.save();  // guarda el contexto limpio de efectos
    player.show();
    //dibuja y actualiza la posición de cada enemigo
    for(var i=enemies.length-1;i>=0;i--){
      enemies[i].update();
      enemies[i].show();
    }
    //dibuja cada obstáculo
    for(var i=walls.length-1;i>=0;i--){
      walls[i].show();
    }
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
    for(var i=enemies.length-1;i>=0;i--){
      comer(player,enemies[i]);

      enemies[i].show();
      enemies[i].update();
    }
    //dibuja
    for(var i=walls.length-1;i>=0;i--){
      walls[i].show();
    }
    if(enemies.length<player.level){
      enemies.push(new Enemy);
    }
    /*if(player.score>=1){
      console.log(player.score);
    }*/
    console.log(player.score);

  }

}
/************************************
Autor: Francisco Javier Castellano Farrak
Fecha: 13/3/18
Definición: función para ver si el player y el enemigo están en la misma posición
Ref:https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
*************************************/
function comer(player,enemy){
  if(enemy.x<player.x+this.len&&enemy.x+enemy.width>player.x&&enemy.y<player.y+this.len&&enemy.y+enemy.width>player.y){
    player.score++;
  }
}



function listenKeyPressed(){
  //Esta funcion se ejecuta al pulsar una tecla
  ////-->> window.addEventListener('keydown',listenKeyPressed,true);
  keyCode=window.event.keyCode;//coge el codigo de la tecla pulsada
  switch (keyCode){
    case 40: //abajo
    player.y+=step;
    //alert("holaaaa abajo");
    break;
    case 39: //derecha
    player.x+=step;
    //alert("holaaaa d");
    break;
    case 38: //arriba
    player.y-=step;
    //alert("holaaaa arriba");
    break;
    case 37: //izquierda
    player.x-=step;
    //alert("holaaaa izq");
    break;
    default:
    break;
  }


}
