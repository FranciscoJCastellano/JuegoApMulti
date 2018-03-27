/*código del juego*/
var step=4;
var player;
var orbe=[];
var enemies=[];
var walls=[];
var wallspos=[]; // aquí se almacenarán todas las posiciones de muros
// (computacionalmente más rápido que usar loops)
var food=[];
// var bullets=[];
var factor=10;//factor de dificultad para generar enemigos y obstáculos.
var level=10;//nivel de juego
var w=1280;
var h=720;
var random=0;//para generar random para las velocidades iniciales
var numDigY = h.toString().length; // para saber cuantos digitos la altura del canvas
var multp = Math.pow(10, numDigY); // servirá para almacenar posiciones
var isDay=true;//variable para saber si es de día o de noche
var goal=2;//el numero de veces que se come toda la comida para recargar canvas
var velMax=5;
var tec=[];//array donde se verifica tecla pulsada
var numMax=70;//num maximo de objetos
var gameIsOn=true;//para indicar si el juego está en marcha
var counter=0;//contador para cambiar nivel si se come toda la comida
var totalScore=0;
var umbral1=15;//umbral para detectar dia/noche
var umbral2=30;//umbral para detectar dia/noche
var levelChange=false;
var isLoading=false;
var show=true;
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
    ctx.clearRect(0,0,w,h); // borra las figuras
    ctx.save();                 // guarda el contexto limpio de efectos
  }
}
/************************************
Modificación
Autores: Jaime Moreno Quintanar
Fecha: 17/3/18
Definición: se carga el escenario, pero no empieza el juego hasta que se pulsa el play del vídeo
*************************************/
window.onload = function(){
  setup();
  //gameOn(); //El Juego empieza cuando se pulsa PLAY(y empieza el vídeo también)
}
function gameOn(){
  if(gameIsOn){

    setInterval(draw,10);


  }

  //alert("GAME ON");
}
/************************************
Autores: Alejandro Enrique Trigueros Álvarez y Francisco Javier Castellano Farrak
Fecha: 10/3/18
Definición: borramos canvas y redibujamos player, comida, enemigos y obstáculos
*************************************/
function draw(){
  document.getElementById('score').innerHTML = "Score: " +totalScore;
  document.getElementById('life').innerHTML = "Life: " + player.life;
  document.getElementById('level').innerHTML = "Level: " + player.level;
  document.getElementById('time').innerHTML = "Time Elapsed: " + Math.floor(videoJuego.currentTime);
  document.getElementById('enemies').innerHTML = "Enemies: " + enemies.length;
  document.getElementById('food').innerHTML = "Food: " + food.length;
  gameUpdate();
  gameShow();

}
/************************************
Autores: Alejandro Enrique Trigueros Álvarez, Francisco Javier Castellano Farrak, Sergio Elola García
Fecha: 14/3/18
Definición: guardamos el ctx sin nada dibujado y dibujamos los enemigos, player, bloques y comida
*************************************/
function setup(){
  window.addEventListener('keydown', function(e){
    e.preventDefault();
    //listenKeyPressed(e.keyCode);
    ctx.key=e.keyCode;
    ctx.keys=(ctx.keys||[]);
    tec[e.keyCode]=true;
  },true);//Evento:se pulsa una tecla

  window.addEventListener('keyup', function (e) {
    ctx.key = false;
    tec[e.keyCode]=false;
  });
  pags.className = "ocultx";
  loadWheel.className = "visiblx";
  isLoading=true;
  loading();
  createCreatures();
  crearParedes();
  isLoading=false;
  loading();

  // console.log("Enemigos: "+enemies.length);
  player.score=totalScore;

  document.getElementById('score').innerHTML = "Score: " + totalScore;
  document.getElementById('life').innerHTML = "Life: " + player.life;
  document.getElementById('level').innerHTML = "Level: " + player.level;
  document.getElementById('time').innerHTML = "Time Elapsed: " + Math.floor(videoJuego.currentTime);
  document.getElementById('enemies').innerHTML = "Enemies: " + enemies.length;
  document.getElementById('food').innerHTML = "Food: " + food.length;

  gameShow();

}

function gameShow(){

  ctx = cargaContextoCanvas('myCanvas');

  if(ctx){

    //listenKeyPressed(ctx);
    multiKeyPressed(ctx);//mejora de listenKeyPressed()

    borra_todo();

    if(!isDay){
      var ie=enemies.length;
      while(ie--){
        enemies[ie].show();
      }
      if(orbe.length>0){
        orbe[0].show();
      }
    }
    var iw=walls.length;
    while(iw--){
      walls[iw].show();
    }
    if(isDay){
      var ifood=food.length;
      while(ifood--){
        food[ifood].show();
      }
    }
    player.show();
  }
}
function gameUpdate(){
  totalScore=player.score;
  if(load){
    document.addEventListener("timeupdate", instante(videoJuego), false);
  }

  comer(player,food);
  comer(player,orbe);
  lucha(player,enemies);

  if(player.life<=0){
    gameIsOn=false;
    console.log('YOU LOSE');
    window.location.href= "index.html";
    return 0;
  }
  repoblate(0);//rellena comida si no queda
  //repoblate(1);//rellena orbe// no hace falta, el orbe se genera en cada nivel
  repoblate(2);//rellena enemigo
}

/********************************************
Autor: Francisco Javier Castellano Farrak
Fecha: 23/03/2018
Def: función para crear las criaturas del juego
*******************************************/
function createCreatures(){
  //creamos player
  player=new Player();

  //generamos orbe
  var i=true;
  while (i) {
    newOrbe = new Orbe();
    i=newOrbe.coincideConWall();
    if (i==false) {
      orbe.push(newOrbe);
    }
  }

  //generamos los enemigos
  var i=level*factor*0.6;
  if(i>numMax*0.4){
    i=numMax*0.4;
  }
  while(i--){
    enemies.push(new Enemy);
  }

  //generamos la comida
  var i=factor*1.8;
  while(i--){
    food.push(new Food);
  }
}
/********************************************
Autor:Sergio Elola García
Fecha: 14/03/2018
Mejora: Ahora si el muro es válido lo almacena, si no es válido genera otro
*******************************************/
function crearParedes(){
  //generamos las paredes
  var works=0;
  var k=1.03*factor*level;
  if(k>numMax){
    k=numMax;
  }
  // for(var i=0;i<k;i++){
  for(var i=0;i<k;i++){
    works = 0; // Si work = 0 el muro no es válido
    while (!works){ // repetir hasta que salga un muro válido
      newWall = new Wall();
      coincideWall(orbe,newWall);
      if(newWall.valid == 1){
        works = 1;
      }

      coincideWall(player,newWall);
      if (newWall.valid == 1 && works==1){
        walls.push(newWall);
        works = 1;
      }else woks=0;

    }
  }
  // guardamos las posiciones de todos los muros (Solo se hace 1 vez!)
  // Si (432, 123) es muro, se añade 432123
  // Se guardan solo las posiciones de los bordes, con un ancho de la longitud
  // del Player

  var wallx=0;
  var wally=0;
  var wallxmax=0;
  var wallymax=0;

  var i=walls.length;
  var lenPla = player.len;
  var desv = 3; // desviación, utilizada para asegurar que no haya errores
  while (i--){
    wallx = walls[i].x;
    wally = walls[i].y;
    wallxmax = wallx + walls[i].width;
    wallymax = wally + walls[i].height;
    for (var j = wallx; j <= wallxmax; j++){
      for (var k = wally,thresholdSup=wally+lenPla+desv; k <=thresholdSup ; k++){  // borde superior
        wallspos.push(j*multp+k);
      }
      for (var k = wallymax-lenPla-desv; k <= wallymax ; k++){   // borde inferior
        wallspos.push(j*multp+k);
      }
    }
    for (var k = wally+lenPla+desv,thresholdLeft=wallymax-lenPla-desv; k <= thresholdLeft; k++){
      for (var j = wallx; j <= wallx+lenPla+desv; j++){   //borde izquierdo
        wallspos.push(j*multp+k);
      }
      for (var j = wallxmax-lenPla-desv; j <= wallxmax ; j++){  //borde derecho
        wallspos.push(j*multp+k);
      }
    }
  }

  // Para eliminar posiciones repetidas en el array (porque se solapan los muros),
  // se crea un objeto Set (en el cual no se permiten elementos repetidos) y luego
  // se transforma a Array
  var unique_array = Array.from(new Set(wallspos));
  wallspos = unique_array;

  wallspos.sort(); // ordenamos para facilitar la búsqueda
  //console.log(walls.length);

}
/*************************
Fecha: 25/3/18
Definición: función para vaciar arrays antes de cambiar de nivel
*************************************/
function clearArrays(){
  var j=enemies.length;
  while(j--){
    enemies.splice(j,1);
  }
  var j=walls.length;
  while(j--){
    walls.splice(j,1);
  }
  var j=food.length;
  while(j--){
    food.splice(j,1);
  }
  var j=wallspos.length;
  while(j--){
    wallspos.splice(j,1);
  }
}
/********************************************
Autor: Francisco Javier Castellano Farrak
Fecha: 23/03/2018
Def: función para repoblar si se acaban enemigos, comida u orbes
types: 0->Food 1->orbe 2->enemigos
*******************************************/
function repoblate(type){
  switch(type){
    case 0://comida
    if(food.length<=0){
      counter++;
      var i=factor*0.8;
      while(i--){
        food.push(new Food);
      }
      player.score++;
      if(counter==2){
        newDay(isDay,player);
        counter=0;
      }
    }
    break;
    case 1://orbe
    if(orbe.lenth>0){
      orbe=[];
    }
    if(orbe.length<0){
      orbe.push(new Orbe);
    }
    break;
    case 2://enemigos
    if(enemies.length<=0){
      var i=level*factor*0.7;
      while(i--){
        enemies.push(new Enemy);
      }
    }
    break;
    default:break;
  }
}
/********************************************
Autor:Sergio Elola García
Fecha: 14/03/2018
Def: detecta si el player está en
alguna posición de las paredes
*******************************************/
function detectarWall(player){
  var posxNew = player.x + player.speedX;
  var posyNew = player.y + player.speedY;
  var lenPl = player.len;
  var constX = 2; // para ajustar
  var constY = 2; // para ajustar

  if ((!(wallspos.includes((posxNew+1)*multp+posyNew+1))) && // arriba/izquierda
  (!(wallspos.includes((posxNew+lenPl-1)*multp+posyNew+1))) && //arriba/derecha
  (!(wallspos.includes((posxNew+1)*multp+posyNew+lenPl-1))) && // abajo/izquierda
  (!(wallspos.includes((posxNew+lenPl-2)*multp+posyNew+lenPl-1)))) { //abajo/derecha
    return true;
  }else
  return false;
}
/************************************
Autor: Francisco Javier Castellano Farrak
Fecha: 13/3/18
Definición: función para ver si el player y la comida están en la misma posición
aumenta la vida del player y elimina la comida
Ref:https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
*************************************/
function comer(player,comida){
  var i=comida.length;
  while(i--){
    if(player.hasCollided==false){
      if (coincide(player,comida[i])){
        player.score+=comida[i].prize;
        player.colourChange(true);

        if(i>-1){
          comida.splice(i,1);
        }
        player.hasCollided=true;
        player.life+=2;
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
  var i=enemies.length;
  while(i--){
    if(player.hasCollided==false){
      if (coincide(player,enemies[i])){
        player.colourChange(false);
        player.life-=enemies[i].power;
        enemies[i].life-=player.power;

        if(i>-1){
          if(enemies[i].life<=0){
            enemies.splice(i,1);
            player.score+=enemies[i].prize;
          }
        }
        player.hasCollided=true;

      }
    }else if(player.hasCollided==true&&!coincide(player,enemies[i])){
      player.hasCollided=false;
    }
  }
}
/************************************
Autor: Francisco Javier Castellano Farrak
Fecha: 13/3/18
Definición: función para ver si la comida/enemigo coinciden
*************************************/
function coincide(player,enemy){
  var coincide=player.x < enemy.x + enemy.len &&
  player.x + player.len > enemy.x &&
  player.y < enemy.y + enemy.len &&
  player.len + player.y > enemy.y;
  return coincide;
}
/************************************
Autor: Francisco Javier Castellano Farrak
Fecha: 16/3/18
Definición: función para ver si la comida y wall coinciden
*************************************/
function coincideWall(player,wall){
  if(player.x < wall.x + wall.width &&
    player.x + player.len > wall.x &&
    player.y < wall.y + wall.height &&
    player.len + player.y > wall.y){
      wall.valid=0;
    }
  }
  /************************************
  Autor: Francisco Javier Castellano Farrak
  Fecha: 16/3/18
  Definición: función para ver si es de día
  e iniciar nivel nuevo
  *************************************/
  function newDay(isDay,player){
    if(isDay){
      level++;
      totalScore+=player.score;
      counter=0;
      setup();
    }
  }

  /********************************************
  Autor:Alejandro Enrique Trigueros Álvarez
  Fecha: 14/03/2018
  Def: actualiza la velocidad del player segun la tecla pulsada
  *******************************************/
  // function listenKeyPressed(contx){
  //   //Esta funcion se ejecuta al pulsar una tecla
  //   key=contx.key;
  //   player.speedX=0;
  //   player.speedY=0;
  //   if(key==40){//abajo
  //     player.speedY = step;
  //   }
  //   if(key==39){//derecha
  //     player.speedX = step;
  //   }
  //   if(key==38){//arriba
  //     player.speedY= -step;
  //   }
  //   if(key==37){//izquierda
  //     player.speedX= -step;
  //   }
  //   player.movePlayer();
  //   if(key==32){//ESPACIO
  //     //alert("Eres un pipa :3");
  //   }
  // }


  /********************************************
  Autor:Alejandro Enrique Trigueros Álvarez
  Fecha: 17/03/2018
  Def: actualiza la velocidad del player segun la tecla pulsada
  *******************************************/
  function multiKeyPressed(c){
    player.speedX=0;
    player.speedY=0;

    if(c.keys && tec[40]){
      player.speedY = step;
    }
    if(c.keys && tec[39]){
      player.speedX = step;
    }
    if(c.keys && tec[38]){
      player.speedY = -step;
    }
    if(c.keys && tec[37]){
      player.speedX = -step;
    }
    player.movePlayer();

  }
