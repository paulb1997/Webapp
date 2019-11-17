"use strict";

import stylesheet from "./memoryspiel.css";
import overview from "./memoryspiel.html";

var memory_array = ['&#128519;','&#128519;','&#128520;','&#128520;','&#128526;','&#128526;','&#128513;','&#128513;','&#128514;','&#128514;','&#128521;','&#128521;','&#128525;','&#128525;','&#128523;','&#128523;','&#128527;','&#128527;','&#128512;','&#128512;'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;

Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
function newBoard(){
	tiles_flipped = 0;
	var output = '';
    memory_array.memory_tile_shuffle();
	for(var i = 0; i < memory_array.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
	}
	document.getElementById('memory_board').innerHTML = output;
}
newBoard();

function memoryFlipTile(tile,val){
	if(tile.innerHTML == "" && memory_values.length < 2){
		tile.style.background = '#FFF';
		tile.innerHTML = val;
		if(memory_values.length == 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		} else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){
				tiles_flipped += 2;
				// Clear both arrays
				memory_values = [];
            	memory_tile_ids = [];
				// Check to see if the whole board is cleared
				if(tiles_flipped == memory_array.length){
					alert("Board cleared... generating new board");
					document.getElementById('memory_board').innerHTML = "";
					newBoard();
				}
			} else {
				function flip2Back(){
				    var tile_1 = document.getElementById(memory_tile_ids[0]);
				    var tile_2 = document.getElementById(memory_tile_ids[1]);
				    tile_1.style.background = 'url(memoryRückseite.png) no-repeat';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = 'url(memoryRückseite.png) no-repeat';
            	    tile_2.innerHTML = "";
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}
(function () {
  var timeContainer = document.getElementById("timer-value");
  var startButton = document.getElementById("start-game");
  var timer = 0;
  var maxTime = 120;
  var timeout = null;
  function count () {
    timeout = setTimeout(function () {
      if (timer < maxTime) {
        timer++;
        timeContainer.innerText = timer;
        count();
      }
      else {
        alert("Die Zeit ist leider vorbei! Danke fürs mitspielen.");
        startButton.style.display = "inline-block";
      }
    }, 1000);
  }
  function endGame () {
    clearTimeout(timeout);
    startButton.style.display = "inline-block";
    alert("Herzlichen Glückwunsch! Du hast das Memory in der vorgegebenen Zeit gelöst.");
  }
  function startGame () {
    if (timeout) { clearTimeout(timeout); }
    timer = 0;
    timeContainer.innerText = timer;
    this.style.display = "none";
    count();
  }
  document.getElementById("start-game").addEventListener("click", startGame);
  document.getElementById("end-game").addEventListener("click", endGame);
})();
