"use strict";

import stylesheet from "./app.css";

import Navigo from "navigo/lib/navigo.js";
import Overview from "./Startseite/startseite.js";
import Rangliste from "./Rangliste/rangliste.js";
import Memoryspiel from "./Memoryspiel/Memoryspiel.js";
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
}

initRouter(){

        console.log("init Router");
        this._router = new Navigo("http://localhost1234/", false);
        this._currentUrl = "";
        this._router.on({
            "Startseite":           () =>{ this.ShowStartseite();},
            "Memoryspiel":          () =>{ this.showMemoryspiel();},
            "Rangliste":            () =>{ this.showRangliste();},
               "*": () =>{ this.showSrtartPage();},
        });
    }

    start(){
        console.log("Die Klasse App sagt Hallo!");
        this._router.resolve();
    }
ShowStartseite(){
    let view = new Startseite(this);
    this._switchVisibleView(view);
}
showMemoryspiel(){
    let view = new Memoryspiel(this);
    this._switchVisibleView(view);
}
showRangliste(){
    let view = new Rangliste(this);
    this._switchVisibleView(view);
}


        _switchVisibleView(view) {
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
