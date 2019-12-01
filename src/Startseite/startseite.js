"use strict";
import Database from "../database.js";
class Startseite {
  constructor(app, player) {
    this.app = app;
    this.player = player;
  }

  async showStartseite() {
    let template = await import("./startseite.html");
    let div = document.createElement("div");
    div.innerHTML = template.trim();
    document.getElementById("content").appendChild(div);
    document
      .getElementById("bestätigenknopf")
      .addEventListener("click", async () => {
        let spieler = new Database.Player();
        let name = document.getElementById("nameeintragen").value;
        await Promise.all([
          spieler.saveplayer({
            name: name,
            punkte: 0
          })
        ]);
      });
  }
}

export default Startseite;
