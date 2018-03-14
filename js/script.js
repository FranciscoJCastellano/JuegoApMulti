/*código del juego*/
var step=5;
var enemies=[];
var walls=[];
var food=[];
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

/************************************
Autores: Alejandro Enrique Trigueros Álvarez y Francisco Javier Castellano Farrak
Fecha: 14/3/18
Definición: guardamos el ctx sin nada dibujado y dibujamos los enemigos, player, bloques y comida
*************************************/
function setup(){
  window.addEventListener('keydown', function(e){
    e.preventDefault();
    //listenKeyPressed(e.keyCode);
    ctx.key=e.keyCode;
  },true);//Evento:se pulsa una tecla

  window.addEventListener('keyup', function (e) {
    ctx.key = false;
  });
  player=new Player();
  //generamos las paredes
  for(var i=0;i<factor*player.level;i++){
    walls.push(new Wall);
  }
  //generamos los enemigos
  for(var i=0;i<player.level*factor/2;i++){
    enemies.push(new Enemy);
  }
  //generamos la comida
  for(var i=0;i<player.level*factor/2;i++){
    food.push(new Food);
  }

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
    //dibuja y actualiza la posición de la comida
    for(var i=food.length-1;i>=0;i--){
      food[i].update();
      food[i].show();
    }
    player.show();

  }
}
/************************************
Autores: Alejandro Enrique Trigueros Álvarez y Francisco Javier Castellano Farrak
Fecha: 10/3/18
Definición: borramos canvas y redibujamos player, comida, enemigos y obstáculos
*************************************/
function draw(){
  ctx = cargaContextoCanvas('myCanvas');
  listenKeyPressed(ctx);
  if(ctx){

    borra_todo();
    player.colision();
    player.show();
    comer(player,food);
    lucha(player,enemies);

    for(var i=enemies.length-1;i>=0;i--){
      enemies[i].show();
      enemies[i].update();
    }
    for(var i=food.length-1;i>=0;i--){
      food[i].show();
      food[i].update();
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
Definición: función para ver si el player y la comida están en la misma posición
aumenta la vida del player y elimina la comida
Ref:https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
*************************************/
function comer(player,comida){
  for(var i=comida.length-1;i>=0;i--){
    if(player.hasCollided==false){
      if (coincide(player,comida[i])){
        if(i>-1){
          comida.splice(i,1);
        }
        player.hasCollided=true;
        player.life++;
        console.log(player.life);
      }
    }else if(player.hasCollided==true&&!coincide(player,comida[i])){
      player.hasCollided=false;
    }
  }
}
/************************************
Autor: Francisco Javier Castellano Farrak
Fecha: 13/3/18
Definición: función para ver si el player y los enemigos están en la misma posición
iDEA: poner
Ref:https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
*************************************/
function lucha(player,enemies){
  for(var i=enemies.length-1;i>=0;i--){
    if(player.hasCollided==false){
      if (coincide(player,enemies[i])){
        //si quedan enemigos aun y ya no tienen vida los elimina
        player.life-=enemies[i].power;
        enemies[i].life-=player.power;

        if(i>-1){
          if(enemies[i].life<=0){
            enemies.splice(i,1);
          }
        }
        player.hasCollided=true;
        console.log(player.life);
        console.log(enemies[i].life);

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



function listenKeyPressed(contx){
  //Esta funcion se ejecuta al pulsar una tecla
  //mirar setup()
  key=contx.key;

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
