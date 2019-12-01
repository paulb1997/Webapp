"use strict";

import Dexie from "dexie/dist/dexie.js";

const database = new Dexie("DatenbankMemory");

database.version(1).stores({
  player: "++id, name, punkte"
});

class Player {
  async saveplayer(name) {
    return database.player.add(name);
  }
  async update(id, player) {
    return database.player.update(id, player);
  }
  async delete(id) {
    return database.player
      .where("id")
      .equals(id)
      .delete();
  }
  async clear() {
    return database.player.clear();
  }
  async getById(id) {
    return database.player
      .where("id")
      .equals(id)
      .toArray();
  }
  async getAll() {
    return database.player.toArray();
  }
}

export default {
  database,
  Player
};
