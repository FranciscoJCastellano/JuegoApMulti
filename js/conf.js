/*funciones paraorganizar pestañas y demás acciones ajenas al juego*/
var juegoId;
var descrId;
var procId;
var autId;
var refId;
var menu;
var data;
var loadWheel;
var bodyEl;
function ver(){
  menu.style.display="block";
  // data.style.display="none";
}
function esconder(){
  menu.style.display="none";
  data.style.display="block";
}
/*********************
Función para inicializar los elementos necesarios DOM
**********************/
function initIds(){
  menu=document.getElementById("menu");
  data=document.getElementById("dataJuego");
  bodyEl=document.getElementsByTagName("body")[0];
  pags=document.getElementById("pags");
  juegoId=document.getElementById("juego");
  descrId=document.getElementById("descripcion");
  procId=document.getElementById("proceso");
  autId=document.getElementById("autores");
  refId=document.getElementById("referencias");
  loadWheel=document.getElementById("wheel");

  pags.className = "ocultx";
  ver();
}
document.addEventListener("DOMContentLoaded", initIds, false);

function loading(){
  if(!isLoading){
    loadWheel.className = "ocultx";
    pags.className = "visiblx";
  }else if(isLoading){
    pags.className = "ocultx";
    loadWheel.className = "visiblx";
  }
}

function hacerVisible(idEl){

  start();
  if(idEl<0||idEl>5){
    alert("xddd");
    idEl=0;
  }
  switch(idEl){
    case 0:
    juegoId.className = "visiblx";
    bodyEl.className="noFondo";
    break;
    case 1:
    descrId.className = "visiblx";
    bodyEl.className="fondo";
    pause(videoJuego);
    break;
    case 2:
    procId.className = "visiblx";
    bodyEl.className="fondo";
    pause(videoJuego);
    break;
    case 3:
    autId.className = "visiblx";
    bodyEl.className="fondo";
    pause(videoJuego);
    break;
    case 4:
    refId.className = "visiblx";
    bodyEl.className="fondo";
    pause(videoJuego);
    break;
  }
  // esconder();
}

function start(){
  juegoId.className = "ocultx";
  descrId.className = "ocultx";
  procId.className = "ocultx";
  autId.className = "ocultx";
  refId.className = "ocultx";

}
/***************************************
addEventListener para incluir internet explorer
****************************************/
function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, callback);
    }
}

//////compatibilidad internet explorer //stackoverflow
if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
}

//includes
//sharmaprakash.com.np
if (!Array.prototype.includes) {
  Array.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 1;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}
