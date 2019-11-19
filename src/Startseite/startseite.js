import Databse from "../database.js";

export async function loadPlayer() {
  return new Promise(async resolve => {
    let player = new Database.Player();
    var elements = await player.getAll();
}

export async function addPlayer() {
  let player = new Database.Player();
  var newUsername = document.getElementById("nameeintragen").value;

  if (newUsername == "") {
    alert("Bitte namen eintragen!");
    return;
  }
  await Promise.all([
   player.saveNew({
     name: newUsername,
     punkte: 0,
   })
 ]);
}

document.getElementById("bestätigen").addEventlistener("click", addPlayer);
