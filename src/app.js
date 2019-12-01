"use strict";

import stylesheet from "./app.css";

import Navigo from "navigo";
import Startseite from "./Startseite/startseite";
import Rangliste from "./Rangliste/rangliste";
import Memoryspiel from "./Memoryspiel/memoryspiel";
/**
 * Hauptklasse der Anwendung. Kümmert sich darum, die Anwendung auszuführen
 * und die angeforderten Bildschirmseiten anzuzeigen.
 */
class App {
    /**
     * Konstruktor.
     */
    constructor() {

        this._title = "My App";
        this._currentView = null;
        this.initRouter();
        this._router.hooks({
                after: (params) => {
                    // Navigation durchführen, daher die neue URL merken
                    this._currentUrl = this._router.lastRouteResolved().url;
                }
            }
        );
    }

    initRouter() {

        console.log("init Router");
        this._router = new Navigo("http://localhost:1234/", false);
        this._currentUrl = "";
        this._router.on({
            "Startseite": () => {
                this.showStartseite();
            },
            "Memoryspiel": () => {
                this.showMemoryspiel();
            },
            "Rangliste": () => {
                this.showRangliste();
            },
            "*": () => {
                this.showStartseite();
            },
        });
    }

    start() {
        console.log("Die Klasse App sagt Hallo!");
        this._router.resolve();
    }

    async showStartseite() {
        document.getElementById("content").innerHTML = "";
        let startseite = new Startseite();
        await startseite.showStartseite();
    }

    async showMemoryspiel() {
        this._router.updatePageLinks();
        document.getElementById("content").innerHTML = "";
        let memoryspiel = new Memoryspiel();
        await memoryspiel.showPage();
    }

    async showRangliste() {
        this._router.updatePageLinks();
        document.getElementById("content").innerHTML = "";
        let rangliste = new Rangliste(["Kev", "Dir", "Flo"]);
        await rangliste.showPage();
    }


    async _switchVisibleView(view) {
        // Alles klar, aktuelle View nun wechseln
        document.title = `${this._title} – ${view.title}`;

        this._currentView = view;
        console.log()
        var content = await view.onShow();
        this._switchVisibleContent(content);
        return true;
    }

    _switchVisibleContent(content) {
        // <header> und <main> des HTML-Grundgerüsts ermitteln
        let app = document.querySelector("#app");
        let header = document.querySelector("#app > header");
        let main = document.querySelector("#app > main");

        // Zuvor angezeigte Inhalte entfernen
        // Bei der Topbar nur die untere Zeile, im Hauptbereich alles!
        app.className = "";
        // header.querySelectorAll(".bottom").forEach(e => e.parentNode.removeChild(e));
        main.innerHTML = "";

        // CSS-Klasse übernehmen, um die viewspezifischen CSS-Regeln zu aktivieren
        if (content && content.className) {
            app.className = content.className;
        }


        if (content && content.main) {
            content.main.forEach(element => {
                main.appendChild(element);
            });
        }
        this._router.updatePageLinks();
    }
}

export default App;
