/************************************
Autor: Francisco Javier Castellano Farrak
Fecha: 28/3/18
Definición: funciones para mostrar las Puntuaciones
que se guardan en localstorage
*************************************/

/****************
Objeto para juntar el usuario con su puntuación
*****************/
function Data(score){
  this.user="Player";
  this.score=score;

  this.set=function(){
    this.user=prompt('Enter your name:');
    if(this.user===""||this.user===null){
      this.user="No One";
    }
  }
}

var scores=[];
var tabla;
var JSONscores;
var p;
var restored=0;
/***************
Se inicia un array vacío de datos
********************/

function iniciar(){
  var data1=new Data(0);
  var data2=new Data(0);
  var data3=new Data(0);
  var data4=new Data(0);
  var data5=new Data(0);
  scores.push(data1,data2,data3,data4,data5);
  sortData(scores);
  return scores
}

var totalScore=JSON.parse(localStorage.getItem('latestScore'));


/*******************
función para añadir una puntuación nueva si entra en el top 5
********************/
function addNewScore(newScore,oldScores){
  if(oldScores===undefined||oldScores===null){
    scores=iniciar();
    oldScores=scores;
  }
  if(newScore>oldScores[0].score){
    oldScores.splice(0,1,new Data(newScore));//elimina el ultimo elemento y mete uno nuevo
    oldScores[0].set();
    sortData(oldScores);
  }else{
    p.setAttribute("class", "texto2");
    //muestra el texto del parrafo
  }
}

/***********************
Añade las nuevas puntuaciones en local storage
****************************/
function setNewScores(scores){
  let JSONscores=JSON.stringify(scores);
  localStorage.setItem('scores',JSONscores);
  return JSONscores;
}
/*********************
ordena los datos(usuario + puntuacion) según la puntuación
de menor a mayor
*******************/
function sortData(data){
  data.sort(function(a, b){return a.score-b.score});
}

/***********************
Coge el elemento tabla y ñade una fila para usuario y puntuacion
a continuación, le da los valores del dato introducido
***************************/
function añadirATabla(data){
  tabla=document.getElementById("tabla").getElementsByTagName('tbody')[0];
  var newfila = tabla.insertRow(-1);
  var  newuser = newfila.insertCell(-1);
  var  newscore = newfila.insertCell(-1);
  newuser.innerHTML=data.user;
  newscore.innerHTML=data.score;
}
/***********************
Coge el elemento tabla y elimina las filas
***************************/
function eliminarFilas(){
  tabla=document.getElementById("tabla").getElementsByTagName('tbody')[0];
  var j=5;
  while(j--){
    tabla.deleteRow(j);
  }
}
/***********************
Función para volver a la página original del juego
***************************/
function playAgain(){
  window.location.href= "./index.html";
}
/***********************
Función para volver a la página original del juego
***************************/
function restoreScore(){
  if(!restored){
    restored=1;
    eliminarFilas();
    localStorage.removeItem('scores');
    scores.length=0;
    scores=iniciar();
    let JSONrestoredScores=setNewScores(scores);//añadimos la version restaurada de scores
    let restoredScores=JSON.parse(JSONrestoredScores);

    var i=restoredScores.length;
    while(i--){
      añadirATabla(restoredScores[i]);
    }
  }else{
    return;
  }

}


document.addEventListener("DOMContentLoaded", function(){
  //gaurdamos la tabla y el parrafo
  tabla=document.getElementById("tabla");
  p=document.getElementById("fail");

  if(restored){
    scores=iniciar();
  }else{
    restored=0;
  }
  //Intentamos sacar la puntuación de local storage
  //Si no hay nada, se añade el array creado al principio
  var JSONnewscores=localStorage.getItem('scores');
  if(JSONnewscores===null||!localStorage.getItem('scores')){
    JSONnewscores= setNewScores(scores);
  }
  //guardamos las nuevas puntuaciones recibidas de localStorage
  var newscores=JSON.parse(JSONnewscores);

  //añadimos las nuevas Puntuaciones
  //y se meten en la tabla
    addNewScore(totalScore,newscores);

  var i=newscores.length;
  while(i--){
    añadirATabla(newscores[i]);
  }
  //se ponen en localStorage las nuevas puntuaciones
  setNewScores(newscores);

},false);
