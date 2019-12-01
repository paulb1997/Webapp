"use strict";
import Database from "../database.js";

var backgroundImage = require("./memoryRückseite.PNG");

class Memoryspiel {
  constructor(app) {
    this.app = app;
    this.memory_array = [
      "&#128519;",
      "&#128519;",
      "&#128520;",
      "&#128520;",
      "&#128526;",
      "&#128526;",
      "&#128513;",
      "&#128513;",
      "&#128514;",
      "&#128514;",
      "&#128521;",
      "&#128521;",
      "&#128525;",
      "&#128525;",
      "&#128523;",
      "&#128523;",
      "&#128527;",
      "&#128527;",
      "&#128512;",
      "&#128512;"
    ];
    this.memory_values = [];
    this.memory_tile_ids = [];
    this.tiles_flipped = 0;
  }

  async showPage() {
    let template = await import("./memoryspiel.html");
    let div = document.createElement("div");
    div.innerHTML = template.trim();
    document.getElementById("content").appendChild(div);
    this.newBoard();
    timer();
  }

  newBoard() {
    this.tiles_flipped = 0;
    let output = [];
    this.memory_array.memory_tile_shuffle();
    for (let i = 0; i < this.memory_array.length; i++) {
      let idString = "tile_" + i;
      let div = document.createElement("div");
      div.id = idString;
      div.addEventListener("click", () => {
        this.memoryFlipTile(div, i);
      });
      document.getElementById("memory_board").appendChild(div);
    }
  }

  memoryFlipTile(tile, i) {
    let val = this.memory_array[i];
    console.log("Flip called ", val);
    if (tile.innerHTML === "" && this.memory_values.length < 2) {
      console.log("TEST");
      tile.style.background = "#FFF";
      tile.innerHTML = val;
      if (this.memory_values.length === 0) {
        this.memory_values.push(val);
        this.memory_tile_ids.push(tile.id);
      } else if (this.memory_values.length === 1) {
        this.memory_values.push(val);
        this.memory_tile_ids.push(tile.id);
        if (this.memory_values[0] === this.memory_values[1]) {
          this.tiles_flipped += 2;
          // Clear both arrays
          this.memory_values = [];
          this.memory_tile_ids = [];
          // Check to see if the whole board is cleared
          if (this.tiles_flipped === this.memory_array.length) {
            alert("Board cleared... generating new board");
            document.getElementById("memory_board").innerHTML = "";
            this.newBoard();
          }
        } else {
          setTimeout(() => this.flip2Back(), 700);
        }
      }
    }
  }

  flip2Back() {
    let tile_1 = document.getElementById(this.memory_tile_ids[0]);
    let tile_2 = document.getElementById(this.memory_tile_ids[1]);
    tile_1.style = "";
    tile_2.style = "";
    tile_1.backgroundImage = backgroundImage;
    tile_1.innerHTML = "";
    tile_2.backgroundImage = backgroundImage;
    tile_2.innerHTML = "";
    this.memory_values = [];
    this.memory_tile_ids = [];
    console.log("Flipped back!");
  }
}

Array.prototype.memory_tile_shuffle = function() {
  var i = this.length,
    j,
    temp;
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
};

function timer() {
  var timeContainer = document.getElementById("timer-value");
  var startButton = document.getElementById("start-game");
  var timer = 0;
  var maxTime = 120;
  var timeout = null;
  function count() {
    timeout = setTimeout(function() {
      if (timer < maxTime) {
        timer++;
        timeContainer.innerText = timer;
        count();
      } else {
        alert("Die Zeit ist leider vorbei! Danke fürs mitspielen.");
        startButton.style.display = "inline-block";
      }
    }, 1000);
  }
  async function endGame() {
    clearTimeout(timeout);
    startButton.style.display = "inline-block";
    let spieler = new Database.Player();
    var elements = await spieler.getAll();
    console.log(elements);
    //var spielername = die box wo der name steht innerhtml
    //um datenbank einträge zu löschen: .clear();
    await Promise.all([
      spieler.update(1, {
        punkte: timer
      })
    ]);
    console.log(elements);
    alert(
      "Herzlichen Glückwunsch! Du hast das Memory in der vorgegebenen Zeit gelöst."
    );
  }
  function startGame() {
    if (timeout) {
      clearTimeout(timeout);
    }
    timer = 0;
    timeContainer.innerText = timer;
    this.style.display = "none";
    count();
  }
  document.getElementById("start-game").addEventListener("click", startGame);
  document.getElementById("end-game").addEventListener("click", endGame);
}

export default Memoryspiel;
