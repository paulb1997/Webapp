"use strict";

import stylesheet from "./app.css";

import Navigo from "navigo/lib/navigo.js";
import Overview from "./overview/overview.js";
import Detail from "./detail/detail.js";
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

        this._router = new Navigo(null, true);
        this._currentUrl = "";

        this._router.on({
            "detail/display/:id":   params => this.showDetail(params.id, "display"),
            "detail/new":           () => this.showDetail("", "new"),
            "overview":            () => this.showOverview(),
            "*":                    () => this.showOverview(),
        });

        this._router.hooks({
        after: (params) => {
                // Navigation durchführen, daher die neue URL merken
                this._currentUrl = this._router.lastRouteResolved().url;
                }
            }
        );
        }

        /**
         * Ab hier beginnt die Anwendung zu laufen.
         */
        start() {
            console.log("Die Klasse App sagt Hallo!");
            this._router.resolve();
        }

        _switchVisibleView(view) {
            // Alles klar, aktuelle View nun wechseln
            document.title = `${this._title} – ${view.title}`;

            this._currentView = view;
            this._switchVisibleContent(view.onShow());
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

        // Neue Inhalte des Hauptbereichs einfügen
        if (content && content.main) {
            content.main.forEach(element => {
                main.appendChild(element);
            });
        }
    }

    showOverview() {
        let view = new Overview(this);
        this._switchVisibleView(view);
    }

    showDetail(id, mode){
        let view = new Detail(this, id, mode);
        this._switchVisibleView(view);
    }
    }

    export default App;
