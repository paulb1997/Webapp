import Databse from "../database.js";

export async function loadPlayer() {
  return new Promise(async resolve => {
    let player = new Database.Player();
    var elements = await player.getAll();
}
